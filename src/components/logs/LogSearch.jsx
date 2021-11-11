import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import { Form, Button, Overlay, Popover, Row, Col } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/pro-light-svg-icons";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import LogSearchResult from "./LogSearchResult";
import BlueprintSearchResult from "./BlueprintSearchResult";
import CommitSearchResult from "./CommitSearchResult";
import Pagination from "components/common/pagination";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";
import {ApiService} from "api/apiService";
import TabPanelContainer from "components/common/panels/general/TabPanelContainer";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import PipelineFilterSelectInput from "components/logs/PipelineFilterSelectInput";
import ExportLogSearchButton from "components/common/buttons/export/log_search/ExportLogSearchButton";
import {getAllResultsForExport} from "components/common/buttons/export/exportHelpers";
import projectMappingMetadata from "components/settings/data_mapping/projects/projectMapping.metadata";
import Model from "core/data_model/model";
import ProjectMappingToolSelectInput
  from "components/common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolSelectInput";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import JenkinsRegistryToolJobSelectInput
  from "components/common/list_of_values_input/tools/jenkins/tool_jobs/JenkinsRegistryToolJobSelectInput";

// TODO: This entire form needs to be completely refactored
function LogSearch({tools, sideBySide}) {
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilters] = useState([]);
  const [filterType, setFilterType] = useState(Array.isArray(tools) && tools.length > 0 ? tools[0] : "");
  const [jobFilter, setJobFilter] = useState("");
  const [pipelineFilter, setPipelineFilter] = useState("");
  const [stepFilter, setStepFilter] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const [submitted, submitClicked] = useState(false);
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState(null);
  const [logTabData, setLogTabData] = useState([]);
  const [currentLogTab, setCurrentLogTab] = useState(0);
  const [exportData, setExportData] = useState("");
  const [exportDisabled, setExportDisabled] = useState(true);
  const [jenkinsProjectDto, setJenkinsProjectDto] = useState(new Model({
    type: "project",
    tool_identifier: "jenkins",
    tool_id: "",
    key: "",
    value: [],
    owner : "",
    account : {},
    tool_prop: "",
    createdAt: "",
    active : true
  }, projectMappingMetadata, true));
  // const [jenkinsJobs, setJenkinsJobs] = useState([]);

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

  const searchLogs = async (newTab) => {
    setExportDisabled(true);
    setCurrentPage(1);
    submitClicked(true);
    setSubmittedSearchTerm(searchTerm);
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

    await getSearchResults(startDate, endDate, newTab);
    await getAllResultsForExport(startDate, endDate, setIsLoading, getAccessToken(), searchTerm, jenkinsProjectDto, filterType, getFormattedCustomFilters(), currentPage, setExportData, setExportDisabled);  };

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
    setSearchTerm("");
    setCalenderActivation(false);
    setEDate("");
    setSDate("");
    setJobFilter("");
    setPipelineFilter("");
    setStepFilter("");
    setSubmittedSearchTerm(null);
  };

  const handleSelectChange = (selectedOption) => {
    setFilters([]);
    submitClicked(false);
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

    if (filterType === "blueprint" && jobFilter) {
      filterArray.push(jobFilter.value);
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
    jenkinsProjectDto.setData("tool_identifier", "jenkins");
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
  //       setLogData(searchResults);
  //     }
  //   }
  //   catch (error) {
  //     console.error(error)
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // };

  const getSearchResults = async (startDate, endDate, newTab) => {
    setIsLoading(true);
    let newLogTab = newTab === true && logTabData.length < 4 ? logTabData.length : currentLogTab;
    let newLogTabData = logTabData;

    const accessToken = await getAccessToken();
    let route = "/analytics/search";
    if (filterType === "blueprint") {
      route = "/analytics/blueprint";
    }
    const urlParams = {
      toolId: jenkinsProjectDto?.getData("tool_id"),
      jobName: jenkinsProjectDto?.getData("key"),
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

        newLogTabData[newLogTab] = searchResults;
        setLogTabData(newLogTabData);
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        // setErrors(error.toJSON());
        newLogTabData[newLogTab] = [];
        setLogTabData(newLogTabData);
      });

    setCurrentLogTab(newLogTab);
  };

  const getBlueprintFilterData = async () => {
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
  };

  const fetchFilterData = async () => {
    if (filterType === "blueprint") {
      // These filters' dropdown was commented out so I commented this out to prevent an unnecessary data pull.
      // TODO: Rewire up when necessary
      // await getBlueprintFilterData();
    }
  };

  const toggleCalendar = (event) => {
    setCalenderActivation(true);
    setCalendar(!calendar);
    setTarget(event.target);
    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd");
      if (date[0].endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(new Date(date[0].endDate), "MM/dd");
        setEDate(endDate);
      }

      setSDate(startDate);
    }
  };

  const closeCalender = () => {
    setCalendar(false);

    if (date[0].startDate && date[0].endDate) {
      let startDate = format(new Date(date[0].startDate), "MM/dd");
      setSDate(startDate);

      if (date[0].endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(new Date(date[0].endDate), "MM/dd");
        setEDate(endDate);
      }
    }
  };

  const dateChange = (item) => {
    setDate([item.selection]);

    if (item.selection) {
      let startDate = format(item.selection.startDate, "MM/dd");
      setSDate(startDate);

      if (item.selection.endDate === 0) {
        setEDate(startDate);
      } else {
        let endDate = format(item.selection.endDate, "MM/dd");
        setEDate(endDate);
      }
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

  const getBottom = () => {
    if (isLoading) {
      return <LoadingDialog size="sm" />;
    }

    if (submitted) {
      if (!searchTerm) {
        return (<InfoDialog message="Search term required." />);
      }

      const logData = logTabData[currentLogTab];

      if ((logData?.hits == null || Object.keys(logData.hits).length === 0)) {
        return (<InfoDialog message="No results found." />);
      }

      if (Object.keys(logData).length > 0) {
        switch (filterType) {
          case "blueprint":
            return (<BlueprintSearchResult searchResults={logData?.hits} />);
          case "commit":
            return (
              // TODO: Not sure if we want to show both, but this was a bug in legacy code if not
              <>
                <LogSearchResult searchResults={logData?.hits} submittedSearchTerm={submittedSearchTerm} />
                <CommitSearchResult searchResults={logData?.hits} />
              </>
            );
          default:
            return (<LogSearchResult searchResults={logData?.hits} submittedSearchTerm={submittedSearchTerm} />);
        }
      }
    }
  };

  // TODO: Create child component
  const getPaginator = () => {
    const currentData = logTabData[currentLogTab];
    if (filterType !== "blueprint" && filterType !== "commit" && currentData?.total?.value > pageSize) {
      return (
        <Pagination
          total={currentData.total.value}
          currentPage={currentPage}
          pageSize={pageSize}
          onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)}
        />
      );
    }
  };

  const getDynamicFields = () => {
    if (filterType === "opsera-pipeline") {
      return (
        <PipelineFilterSelectInput
          opseraPipelineSelectChange={opseraPipelineSelectChange}
          pipelineFilter={pipelineFilter}
          setStepFilter={setStepFilter}
          stepFilter={stepFilter}
        />
      );
    }

    if (filterType === "blueprint") {
      return (
        <>
        <Col>
          <ProjectMappingToolSelectInput
            model={jenkinsProjectDto}
            setModel={setJenkinsProjectDto}
          />
        </Col>
        <Col>
          <JenkinsRegistryToolJobSelectInput
            model={jenkinsProjectDto}
            setModel={setJenkinsProjectDto}
            fieldName={"key"}
            jenkinsToolId={jenkinsProjectDto?.getData("tool_id")}
          />
        </Col>
        </>
      );
    }

    // if (filterType === "blueprint") {
    //   return (
    //     <Col md={3} className="py-1">
    //       <SelectInputBase
    //         selectOptions={filterOptions}
    //         busy={Object.keys(filterOptions).length === 0}
    //         disabled={Object.keys(filterOptions).length === 0}
    //         className="basic-single"
    //         valueField={'value'}
    //         textField={'label'}
    //         placeholderText={"Select Job Name"}
    //         value={jobFilter}
    //         onChange={setJobFilter}
    //         onToggle={fetchFilterData}
    //       />
    //     </Col>
    //   );
    // }
  };

  // TODO: Make standard inputs
  const getSearchFields = () => {
    return (
      <Row className={"mx-0 py-2"}>
        <Col className="custom-select-input my-2">
          <label><span>Search Index</span><span className="danger-red">*</span></label>          
          <StandaloneSelectInput
            selectOptions={Array.isArray(tools) ? tools : []}
            defaultValue={Array.isArray(tools) ? tools[0] : []}
            className="basic-single"
            valueField="value"
            textField="label"
            filter="contains"
            setDataFunction={handleSelectChange}
          />
        </Col>
        {getDynamicFields()}
        <Col className="custom-select-input my-2">
        <label><span>Search Input</span><span className="danger-red">*</span></label>
        <Form.Control
            placeholder={filterType === "blueprint" ? "Enter Build Number" : "Search logs"}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
    );
  };

  const getNewTabButton = () => {
    if (!sideBySide && logTabData.length > 0 && logTabData.length < 4) {
      return (
        <Button variant="primary" className="ml-1" type="submit" onClick={() => {searchLogs(true);}}>
          Open In New Tab
        </Button>
      );
    }
  };

  const getSearchButtons = () => {
    return (
      <Row className="my-2 mx-0">
        <Col className="text-right">
          <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
            <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth />
            {(calendar && sDate) || eDate ? sDate + " - " + eDate : "Date Range"}
          </Button>
          <Button variant="primary" className="ml-1" onClick={() => {searchLogs();}} disabled={filterType === "blueprint" && (!jenkinsProjectDto?.getData("tool_id") || !jenkinsProjectDto?.getData("key")) || !searchTerm}>            Search
          </Button>
          {getNewTabButton()}
          <Button variant="outline-secondary" className="ml-1" type="button" onClick={cancelSearchClicked}>
            Clear
          </Button>
          <ExportLogSearchButton exportDisabled={exportDisabled} isLoading={isLoading} variant="primary" className="ml-1" searchResults={exportData}/>
          {getDateRangeButton()}
        </Col>
      </Row>
    );
  };

  const getDateRangeButton = () => {
    return (
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
    );
  };

  const handleTabClick = (activeTab) => e => {
    e.preventDefault();
    setCurrentLogTab(activeTab);
  };

  const closeTab = (tabName) => {
    let newArray = logTabData;
    newArray.splice(tabName, 1);
    setCurrentLogTab(tabName - 1);
    setLogTabData([...newArray]);
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={currentLogTab} tabText={"Results"} handleTabClick={handleTabClick} tabName={0} />
        <CustomTab activeTab={currentLogTab} tabText={"Results #2"} handleTabClick={handleTabClick} tabName={1} visible={logTabData.length >= 2} closeTab={closeTab}/>
        <CustomTab activeTab={currentLogTab} tabText={"Results #3"} handleTabClick={handleTabClick} tabName={2} visible={logTabData.length >= 3} closeTab={closeTab}/>
        <CustomTab activeTab={currentLogTab} tabText={"Results #4"} handleTabClick={handleTabClick} tabName={3} visible={logTabData.length >= 4} closeTab={closeTab} />
      </CustomTabContainer>
    );
  };

  return (
    <div>
      {getSearchFields()}
      {getSearchButtons()}
      <div className="p-2"><TabPanelContainer currentView={getBottom()} tabContainer={getTabContainer()} /></div>
      {getPaginator()}
    </div>
  );
}

  LogSearch.propTypes = {
    tools: PropTypes.array,
    sideBySide: PropTypes.bool
  };

export default LogSearch;
