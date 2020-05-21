import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import InfoDialog from "components/common/info";
import ErrorDialog from "components/common/error";
import { Form, Button, Table, Overlay, Popover } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { DateRangePicker } from "react-date-range";
import DropdownList from "react-widgets/lib/DropdownList";
import Multiselect from "react-widgets/lib/Multiselect";
import LogSearchResult from "./LogSearchResult";
import BlueprintSearchResult from "./BlueprintSearchResult";
import Pagination from "components/common/pagination";

function SearchLogs (props) {
  //const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }, { value: "blueprint", label: "Build Blueprint" }];
  const FILTER = props.tools;
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilters] = useState([]);
  const [filterType, setFilterType] = useState("pipeline");
  const [multiFilter, setMultiFilter] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const [submitted, submitClicked] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection"
    }
  ]);
  const [calendar, setCalendar] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleFormSubmit = e => {
    submitClicked(true);
    e.preventDefault();
    setLogData([]);  
    let startDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
    let endDate = format(new Date(date[0].endDate), "yyyy-MM-dd");
    
    if (startDate === endDate) {
      endDate = 0;
    }
    if (calenderActivation === false ){
      startDate = 0;
      endDate = 0;
    }
    if (searchTerm) {
      getSearchResults(startDate, endDate);    
    } else {
      setLoading(false);
      setLogData([]);
    }
    if (endDate === 0) {
      setEDate(startDate);
    } else {
      setEDate(endDate);
    }
    setSDate(startDate);
  };

  const cancelSearchClicked = () => {
    submitClicked(false);
    setLogData([]);
    setSearchTerm("");
    setCalenderActivation(false);
    setEDate("");
    setSDate("");
    setMultiFilter([]);
    setJobFilter("");
  };

  const handleSelectChange = (selectedOption) => {
    setFilters([]);
    submitClicked(false);
    setLogData([]);
    setMultiFilter([]);
    setJobFilter("");
    setFilterType(selectedOption.value);
  };

  const getFormattedCustomFilters = () => {
    let filterArray = [];
    if (filterType === "blueprint") {
      if (jobFilter) {
        filterArray.push(jobFilter.value);
      }
    }
    else {
      multiFilter.forEach(filterGroup => {
        filterArray.push({
          group: filterGroup["type"],
          value: filterGroup["value"]
        });
      });
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


  const getSearchResults = async (startDate, endDate) => {
    setLoading(true);
    setLogData([]);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const urlParams = {
      search: searchTerm,
      date: (startDate !== 0 && endDate === 0) ? startDate : undefined,
      start: (startDate !== 0 && endDate !== 0) ? startDate : undefined,
      end: (startDate !== 0 && endDate !== 0) ? endDate : undefined,
      filter: {
        index: filterType,
        customFilter: getFormattedCustomFilters()
      },
      page: currentPage,
      size: pageSize
    };
    const apiCall = new ApiService("/analytics/search", urlParams, accessToken);
    await apiCall.get().then(result => {
      let searchResults = [];
      if (result) {
        searchResults = result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits : [];
      }
      setNoResults(searchResults.length === 0);
      setLogData(searchResults);
      setLoading(false);
    })
      .catch(function (error) {
        setLogData([]);
        setLoading(false);
        // setErrors(error.toJSON());
      });
  };

  const fetchFilterData = async () => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiCall = new ApiService("/analytics/search/filter", {}, accessToken);
    await apiCall.get()
      .then(res => {
        let filterDataApiResponse = res.data.hits.hits;
        let formattedFilterData = [];
         
        // In the API response, since react-widget can't process nested dataset. We need to add a property to group the dataset
        // We are adding 'type': which is label here to achieve groupBy in react-widget
        filterDataApiResponse.forEach(filterGroup => {
          filterGroup["options"].map((filters) => {
            filters["type"] = filterGroup["label"];
          });
          //Since we add type to the dataset, we only need 'options' for the dropdown
          formattedFilterData.push(...filterGroup["options"]);
        });

        // For Blueprint we only need Job Names  
        if (filterType === "blueprint") {
          setFilters(formattedFilterData.filter(filterSet => filterSet.type == "Job Names"));
        } else {
          setFilters(formattedFilterData);
        }
      })
      .catch(err => {
        setFilters([]);
      });
  };

  const toggleCalendar = event => {
    setCalenderActivation(true);
    setCalendar(!calendar);
    setTarget(event.target);
    let startDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
    let endDate = format(new Date(date[0].endDate), "yyyy-MM-dd");
    if (endDate === 0) {
      setEDate(startDate);
    } else {
      setEDate(endDate);
    }
    setSDate(startDate);
  };

  //Every time we select a new filter, update the list. But only for blueprint and pipeline
  useEffect(() => {
    if (filterType === "blueprint" || filterType === "pipeline") {
      fetchFilterData();
    }
  }, [filterType]);

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        <div className="max-content-width">
          <Form onSubmit={handleFormSubmit}>
            <div className="d-flex mt">
              <div className="p-2 flex-grow-1">
                <Form.Control placeholder="Search logs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="p-2 flex-grow-1">
                <DropdownList
                  data={Array.isArray(FILTER) ? FILTER : [{ "value": "pipeline", "label": "Pipeline" }]}  
                  defaultValue={"pipeline"}
                  className="basic-single"
                  valueField='value'
                  textField='label'
                  filter='contains'
                  onChange={handleSelectChange}             
                />
              </div>
              <div className="p-2">
                <Button variant="outline-secondary" type="button" onClick={toggleCalendar}><FontAwesomeIcon icon={faCalendar} className="mr-1 fa-fw"/>{(calendar && sDate || eDate) ? sDate + " - " + eDate : "Select Date Range"}</Button>
                <Button variant="primary" className="ml-2" type="submit">Search</Button>
                <Button variant="outline-secondary" className="ml-2" type="button" onClick={cancelSearchClicked}>Clear</Button>
                <Overlay
                  show={calendar}
                  target={target}
                  placement="bottom"
                  container={ref.current}
                  containerPadding={20}
                >
                  <Popover className="max-content-width">
                    <Popover.Title><div style={{ display: "flex" }}>Filter By Date<Button variant="outline-secondary" size="sm" type="button" style={{ marginLeft: "auto" }} onClick={ () => setCalendar(false)}>X</Button></div>
                    </Popover.Title>
                    <Popover.Content>
                      <DateRangePicker
                        onChange={item => setDate([item.selection])}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={date}
                        direction="horizontal"
                      />
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </div>
            </div>
            <div className="d-flex mt">
              <div className={filterType === "pipeline" || filterType === "blueprint" ? "p-2 flex-grow-1" : ""}>
                {filterType === "pipeline" && 
                  <Multiselect
                    data={filterOptions} 
                    className="multi-select-filters"
                    busy={Object.keys(filterOptions).length == 0 ? true : false}
                    disabled={Object.keys(filterOptions).length == 0 ? true : false}
                    valueField='value'
                    textField='label'
                    groupBy="type"
                    filter='contains'
                    value={multiFilter}
                    placeholder={"Type to multi-select filters"}
                    onChange={setMultiFilter} 
                    onToggle={fetchFilterData}         
                  />}
                {filterType === "blueprint" && 
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
                }
              </div> 
            </div>
          </Form>
        </div>


        {loading && <LoadingDialog size="sm" />}

        {Object.keys(logData).length > 0 && (filterType == "blueprint" ? <BlueprintSearchResult searchResults={logData.hits} /> : <LogSearchResult searchResults={logData.hits} /> )}
        {Object.keys(logData).length > 0 && <Pagination total={logData.total.value || 30} currentPage={currentPage} pageSize={pageSize} onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)} /> }

        {(!loading && noResults && searchTerm.length > 0) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center">
                <div className="h6">No Results found</div>   
              </div>
            </div>
          </div> 
        }
        {(!loading && !searchTerm && submitted) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="Input a search term in order to perform a log search." /></div>   
              </div>
            </div>
          </div> 
        }
      </>
    );
  }
}

export default SearchLogs;
