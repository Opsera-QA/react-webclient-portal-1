import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import ErrorDialog from "components/common/status_notifications/error";
import { Form, Button, Overlay, Popover, Row, Col } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import "./logs.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import DropdownList from "react-widgets/lib/DropdownList";
import LogSearchResult from "./LogSearchResult";
import BlueprintSearchResult from "./BlueprintSearchResult";
import CommitSearchResult from "./CommitSearchResult";
import Pagination from "components/common/pagination";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import {ApiService} from "api/apiService";

function LogSearch({tools}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [logData, setLogData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilters] = useState([]);
  const [filterType, setFilterType] = useState(Array.isArray(tools) && tools.length > 0 ? tools[0] : "");
  const [multiFilter, setMultiFilter] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState("");
  const [stepFilter, setStepFilter] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const [submitted, submitClicked] = useState(false);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(null);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [calendar, setCalendar] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const node = useRef();

  const handleFormSubmit = (e) => {
    setCurrentPage(1);
    submitClicked(true);
    setSubmittedSearchTerm(searchTerm);
    e.preventDefault();
    setLogData([]);
    let startDate = 0;
    let endDate = 0;
    if (date[0].startDate && date[0].endDate) {
      startDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
      endDate = format(new Date(date[0].endDate), "yyyy-MM-dd");

      if (startDate === endDate) {
        endDate = 0;
      }
      if (calenderActivation === false) {
        startDate = 0;
        endDate = 0;
      }
    }

    if (searchTerm) {
      getSearchResults(startDate, endDate);
    } else {
      setIsLoading(false);
      setLogData([]);
    }
  };

  const cancelSearchClicked = () => {
    setDate([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      },
    ]);
    setCalendar(false);
    submitClicked(false);
    setLogData([]);
    setSearchTerm("");
    setCalenderActivation(false);
    setEDate("");
    setSDate("");
    setMultiFilter([]);
    setJobFilter("");
    setPipelineFilter("");
    setStepFilter("");
    setNoResults(false);
    setSubmittedSearchTerm(null);
  };

  const handleSelectChange = (selectedOption) => {
    setFilters([]);
    submitClicked(false);
    setLogData([]);
    setMultiFilter([]);
    setJobFilter("");
    setPipelineFilter("");
    setStepFilter("");
    setFilterType(selectedOption);
  };

  const opseraPipelineSelectChange = (selectedOption) => {
    setPipelineFilter(selectedOption);
    setStepFilter("");
  };

  const getFormattedCustomFilters = () => {
    let filterArray = [];
    if (filterType === "blueprint") {
      if (jobFilter) {
        filterArray.push(jobFilter.value);
      }
    }
    if (filterType === "opsera-pipeline") {
      if (pipelineFilter) {
        filterArray.push({ Pipeline: pipelineFilter.value });
      }
      if (stepFilter) {
        filterArray.push({ Step: stepFilter.value });
      }
    }
    return filterArray;
  };

  const gotoPage = (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

  // Executed every time page number or page size changes
  useEffect(() => {
    if (searchTerm) {
      getSearchResults();
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node && node.current) {
      if (node.current.contains(e.target)) {
        return;
      }
    }
    setCalendar(false);
  };

  // TODO: Fix this
  // const getSearchResults = async (startDate, endDate) => {
  //   try {
  //     setIsLoading(true);
  //     setLogData([]);
  //     const response = await analyticsActions.searchLogsV2(getAccessToken, undefined, searchTerm, startDate, endDate, filterType, getFormattedCustomFilters(), currentPage, pageSize);
  //
  //     let searchResults = [];
  //     if (response) {
  //       searchResults =
  //         response?.data?.hits ? response.data.hits : [];
  //       setNoResults(searchResults == null || searchResults.length === 0);
  //       setLogData(searchResults);
  //     }
  //     else {
  //       setNoResults(true);
  //     }
  //
  //   }
  //   catch (error) {
  //     console.error(error)
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // };

  const getSearchResults = async (startDate, endDate) => {
    setIsLoading(true);
    setLogData([]);
    const accessToken = await getAccessToken();
    let route = "/analytics/search";
    if (filterType === "blueprint") {
      route = "/analytics/blueprint";
    }
    const urlParams = {
      search: searchTerm,
      date: startDate !== 0 && endDate === 0 ? startDate : undefined,
      start: startDate !== 0 && endDate !== 0 ? startDate : undefined,
      end: startDate !== 0 && endDate !== 0 ? endDate : undefined,
      filter: {
        index: filterType,
        customFilter: getFormattedCustomFilters(),
      },
      page: currentPage,
      size: pageSize,
    };
    const apiCall = new ApiService(route, urlParams, accessToken);
    await apiCall
      .get()
      .then((result) => {
        let searchResults = [];
        if (result) {
          searchResults =
            result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits : [];
        }
        if (searchResults.hits.length === 0) {
          setNoResults(true);
        } else {
          setNoResults(false);
        }
        setLogData(searchResults);
        setIsLoading(false);
      })
      .catch(function (error) {
        setLogData([]);
        setIsLoading(false);
        // setErrors(error.toJSON());
      });
  };

  const fetchFilterData = async () => {
    if (filterType === "blueprint") {
      console.log("fetching filter data");
      setFilters([]);
      const response = await analyticsActions.getBlueprintFilterData(getAccessToken);
      let filterDataApiResponse = response?.data?.hits?.hits;

      if (Array.isArray(filterDataApiResponse) && filterDataApiResponse.length > 0) {
        let formattedFilterData = [];

        // In the API response, since react-widget can't process nested dataset. We need to add a property to group the dataset
        // We are adding 'type': which is label here to achieve groupBy in react-widget
        filterDataApiResponse.forEach((filterGroup) => {
          filterGroup["options"].map((filters) => {
            filters["type"] = filterGroup["label"];
          });
          //Since we add type to the dataset, we only need 'options' for the dropdown
          formattedFilterData.push(...filterGroup["options"]);
        });
        let filteredData = formattedFilterData.filter((filterSet) => filterSet.type === "Job Names");
        setFilters(filteredData);
      }
    }

    if (filterType === "opsera-pipeline") {
      setFilters([]);
      const response = await analyticsActions.getPipelineFilterData(getAccessToken);
      let items = response?.data?.response;

      if (Array.isArray(items) && items.length > 0) {
        let formattedItems = [];
        for (const item in items) {
          let array = [];
          const pipeline = response?.data?.response[item];
          const plan = pipeline?.workflow?.plan;

          if (plan) {
            plan.forEach((step) =>
              array.push({label: step.name, value: step._id})
            );

            formattedItems.push({value: pipeline._id, label: pipeline.name, steps: array});
          }
        }

        if (formattedItems.length > 0) {
          let filterDataApiResponse = [{label: "My Pipelines", options: formattedItems}];
          let formattedFilterData = [];

          // In the API response, since react-widget can't process nested dataset. We need to add a property to group the dataset
          // We are adding 'type': which is label here to achieve groupBy in react-widget
          filterDataApiResponse.forEach((filterGroup) => {
            filterGroup["options"].map((filters) => {
              filters["type"] = filterGroup["label"];
            });
            // console.log(filterDataApiResponse);

            //Since we add type to the dataset, we only need 'options' for the dropdown
            formattedFilterData.push(...filterGroup["options"]);
          });

          setFilters(formattedFilterData);
        }
      }
    }
  };

  const toggleCalendar = (event) => {
    setCalenderActivation(true);
    setCalendar(!calendar);
    setTarget(event.target);
    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd");
      let endDate = format(new Date(date[0].endDate), "MM/dd");
      if (endDate === 0) {
        setEDate(startDate);
      } else {
        setEDate(endDate);
      }
      setSDate(startDate);
    }
  };

  const closeCalender = () => {
    setCalendar(false);
    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd");
      let endDate = format(new Date(date[0].endDate), "MM/dd");
      if (endDate === 0) {
        setEDate(startDate);
      } else {
        setEDate(endDate);
      }
      setSDate(startDate);
    }
  };

  const dateChange = (item) => {
    setDate([item.selection]);
    if (item.selection) {
      let startDate = format(item.selection.startDate, "MM/dd");
      let endDate = format(item.selection.endDate, "MM/dd");

      if (endDate === 0) {
        setEDate(startDate);
      } else {
        setEDate(endDate);
      }
      setSDate(startDate);
    }
  };

  const clearCalendar = () => {
    setDate([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection",
      },
    ]);
    setSDate(undefined);
    setEDate(undefined);
  };

  //Every time we select a new filter, update the list. But only for blueprint and pipeline
  useEffect(() => {
    if (filterType === "blueprint" || filterType === "opsera-pipeline") {
      fetchFilterData();
    }
  }, [filterType]);

  const getBottom = () => {
    if (isLoading) {
      return <LoadingDialog size="sm" />;
    }

    if (!isLoading && !searchTerm && submitted) {
      return (<InfoDialog message="Search term required." />);
    }

    if (logData?.hits && Object.keys(logData.hits).length === 0 && searchTerm) {
     return (<InfoDialog message="No results found." />);
    }

    if (Object.keys(logData).length > 0) {
      switch (filterType) {
        case "blueprint":
          return (<BlueprintSearchResult searchResults={logData.hits} />);
        case "commit":
          return (
            <>
              <LogSearchResult searchResults={logData.hits} submittedSearchTerm={submittedSearchTerm} />
              <CommitSearchResult searchResults={logData.hits} />
            </>
            );
        default:
          return (<LogSearchResult searchResults={logData.hits} submittedSearchTerm={submittedSearchTerm} />);
      }
    }
  };

  const getPaginator = () => {
    if (Object.keys(logData).length > 0 && filterType !== "blueprint" && filterType !== "commit" && !noResults) {
      return (
        <Pagination
          total={logData.total.value || 30}
          currentPage={currentPage}
          pageSize={pageSize}
          onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)}
        />
      );
    }
  };

  if (error) {
    return <ErrorDialog error={error} />;
  } 

  if (!tools.length > 0) {
    return (
    <div className="mt-3 bordered-content-block p-3 max-content-width" style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}> 
    <Row>
        <InfoDialog message="No logs found for this account" />
    </Row>
  </div>
    );
  }

  return (
      <>
        <div className="max-content-width">
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col className="py-1">
                <DropdownList
                  data={Array.isArray(tools) ? tools : []}
                  defaultValue={Array.isArray(tools) ? tools[0] : []}
                  className="basic-single"
                  valueField="value"
                  textField="label"
                  filter="contains"
                  onChange={handleSelectChange}
                />
              </Col>
              {filterType === "opsera-pipeline" ? (
                <Col md={3} className="py-1">
                  {filterType === "opsera-pipeline" && (
                    <DropdownList
                      data={filterOptions}
                      busy={Object.keys(filterOptions).length == 0 ? true : false}
                      disabled={Object.keys(filterOptions).length == 0 ? true : false}
                      // disabled={true}
                      valueField="value"
                      textField="label"
                      filter="contains"
                      value={pipelineFilter}
                      placeholder={"Select Pipeline Name"}
                      onChange={opseraPipelineSelectChange}
                      onToggle={fetchFilterData}
                    />
                  )}
                  {/* {filterType === "blueprint" && 
                  <DropdownList
                    data={filterOptions} 
                    busy={Object.keys(filterOptions).length == 0 ? true : false}
                    disabled={Object.keys(filterOptions).length == 0 ? true : false}
                    className="basic-single"
                    valueField='value'
                    textField='label'
                    filter='contains'
                    placeholder={"Select Job Name"}
                    value={jobFilter}
                    onChange={setJobFilter}    
                    onToggle={fetchFilterData}         
                  />
                } */}
                </Col>
              ) : (
                ""
              )}
              {filterType === "opsera-pipeline" && (
                <Col className="py-1">
                    <DropdownList
                      data={pipelineFilter.steps}
                      busy={Object.keys(filterOptions).length == 0 ? true : false}
                      disabled={Object.keys(pipelineFilter).length == 0 ? true : false}
                      // disabled={true}
                      valueField="value"
                      textField="label"
                      filter="contains"
                      value={stepFilter}
                      placeholder={"Select Step"}
                      onChange={setStepFilter}
                    />
                </Col>
              )}
              <Col className="py-1" md={filterType === "opsera-pipeline" ? 3 : 9}>
                <Form.Control
                  placeholder={filterType === "blueprint" ? "Enter Build Number" : "Search logs"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col className="text-right">
                <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
                  <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth />
                  {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
                </Button>
                <Button variant="primary" className="ml-1" type="submit">
                  Search
                </Button>
                <Button variant="outline-secondary" className="ml-1" type="button" onClick={cancelSearchClicked}>
                  Clear
                </Button>

                <Overlay
                  show={calendar}
                  target={target}
                  placement="bottom"
                  container={ref.current}
                  containerPadding={20}
                >
                  <Popover className="max-content-width">
                    <Popover.Title>
                      <div style={{ display: "flex" }}>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          type="button"
                          style={{ marginRight: "auto" }}
                          onClick={clearCalendar}
                        >
                          Clear
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          type="button"
                          style={{ marginLeft: "auto" }}
                          onClick={closeCalender}
                        >
                          X
                        </Button>
                      </div>
                    </Popover.Title>
                    <Popover.Content ref={node}>
                      <DateRangePicker
                        startDatePlaceholder="Start Date"
                        endDatePlaceholder="End Date"
                        onChange={dateChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={date}
                        direction="horizontal"
                      />
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </Col>
            </Row>
          </Form>
        </div>

        {getBottom()}
        {getPaginator()}
      </>
    );
  }

  LogSearch.propTypes = {
    tools: PropTypes.array
  };

export default LogSearch;
