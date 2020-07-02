import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import InfoDialog from "components/common/info";
import ErrorDialog from "components/common/error";
import { Form, Button, Table, Overlay, Popover, Row, Col } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";
import Moment from "moment";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { DateRangePicker } from "react-date-range";
import DropdownList from "react-widgets/lib/DropdownList";
import Multiselect from "react-widgets/lib/Multiselect";
import LogSearchResult from "./LogSearchResult";
import BlueprintSearchResult from "./BlueprintSearchResult";
import CommitSearchResult from "./CommitSearchResult";
import Pagination from "components/common/pagination";
import { set } from "date-fns/esm";

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
  const [pipelineFilter, setPipelineFilter] = useState("");
  const [stepOptions, setStepOptions] = useState([]);
  const [stepFilter, setStepFilter] = useState("");
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
  const node = useRef();


  const handleFormSubmit = e => {
    setCurrentPage(1);
    submitClicked(true);
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
      if (calenderActivation === false ){
        startDate = 0;
        endDate = 0;
      }
    }

    if (searchTerm) {
      getSearchResults(startDate, endDate);    
    } else {
      setLoading(false);
      setLogData([]);
    }
    // if (endDate === 0) {
    //   setEDate(startDate);
    // } else {
    //   setEDate(endDate);
    // }
    // setSDate(startDate);
  };

  const cancelSearchClicked = () => {
    
    setDate([
      {
        startDate: undefined,
        endDate: undefined,
        key: "selection"  
      }
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
  };

  const handleSelectChange = (selectedOption) => {
    setFilters([]);
    submitClicked(false);
    setLogData([]);
    setMultiFilter([]);
    setJobFilter("");
    setPipelineFilter("");
    setStepFilter("");
    setFilterType(selectedOption.value);
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
        filterArray.push({ "Pipeline": pipelineFilter.value });
      }
      if (stepFilter) {
        filterArray.push({ "Step": stepFilter.value });
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

  const handleClick = e => {
    if (node && node.current) {
      if (node.current.contains(e.target)) {
        return;
      }
    }
    setCalendar(false);
  };

  const getSearchResults = async (startDate, endDate) => {
    setLoading(true);
    setLogData([]);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    let route = "/analytics/search";
    if (filterType === "blueprint") {
      route = "/analytics/blueprint";
    } 
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
    const apiCall = new ApiService(route, urlParams, accessToken);
    await apiCall.get().then(result => {
      let searchResults = [];
      if (result) {
        searchResults = result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits : [];
      }
      if (searchResults.hits.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
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
    if (filterType === "blueprint") {
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
          console.log(formattedFilterData);
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
    }
    if (filterType === "opsera-pipeline") {
      const apiCall = new ApiService("/pipelines", {}, accessToken);
      await apiCall.get()
        .then(res => {
          let formatArr = [];
          for (const item in res.data.response) {
            let stepsArr = [];
            res.data.response[item].workflow.plan.forEach(step => stepsArr.push({ "label": step.name, "value": step._id }));
            formatArr.push({
              "value": res.data.response[item]._id,
              "label": res.data.response[item].name,
              "steps": stepsArr
            });
          }
          let filterDataApiResponse = [{
            label: "My Pipelines", 
            options: formatArr
          }];
          let formattedFilterData = [];
          // In the API response, since react-widget can't process nested dataset. We need to add a property to group the dataset
          // We are adding 'type': which is label here to achieve groupBy in react-widget
          filterDataApiResponse.forEach(filterGroup => {
            filterGroup["options"].map((filters) => {
              filters["type"] = filterGroup["label"];
            });
            console.log(filterDataApiResponse);

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

    }
  };

  const toggleCalendar = event => {
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

  const dateChange = item => {
    console.log(item);
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
        key: "selection"
      }
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

  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        <div className="max-content-width" >
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={3}>
                <DropdownList
                  data={Array.isArray(FILTER) ? FILTER : [{ "value": "pipeline", "label": "Pipeline" }]}  
                  defaultValue={"pipeline"}
                  className="basic-single"
                  valueField='value'
                  textField='label'
                  filter='contains'
                  onChange={handleSelectChange}             
                />
              </Col>
              {filterType === "opsera-pipeline" || filterType === "blueprint" ? <Col md={3}>
                {filterType === "opsera-pipeline" && 
                  <DropdownList
                    data={filterOptions} 
                    busy={Object.keys(filterOptions).length == 0 ? true : false}
                    disabled={Object.keys(filterOptions).length == 0 ? true : false}
                    // disabled={true}
                    valueField='value'
                    textField='label'
                    filter='contains'
                    value={pipelineFilter}
                    placeholder={"Select Pipeline Name"}
                    onChange={opseraPipelineSelectChange} 
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
              </Col> : ""}
              {filterType === "opsera-pipeline" ? <Col md={3}>
                {filterType === "opsera-pipeline" && 
                  <DropdownList
                    data={pipelineFilter.steps} 
                    busy={Object.keys(filterOptions).length == 0 ? true : false}
                    disabled={Object.keys(pipelineFilter).length == 0 ? true : false}
                    // disabled={true}
                    valueField='value'
                    textField='label'
                    filter='contains'
                    value={stepFilter}
                    placeholder={"Select Step"}
                    onChange={setStepFilter}        
                  />}
              </Col> : ""}
              <Col md={filterType === "opsera-pipeline" ? 3 : 9} >
                <Form.Control placeholder="Search logs" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </Col>
              
            </Row>

            <Row className="mt-2">
              {/* <Col md={7}>
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
              </Col> */}
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col md={3} style={{ textAlign: "right" }} className="no-wrap">
                <Button variant="outline-secondary" type="button" onClick={toggleCalendar} >
                  <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth/>
                  {(calendar && sDate || eDate) ? sDate + " - " + eDate : "Date Range"}</Button>
                <Button variant="primary" className="ml-1" type="submit">Search</Button>
                <Button variant="outline-secondary" className="ml-1" type="button" onClick={cancelSearchClicked}>Clear</Button>
                
                <Overlay
                  show={calendar}
                  target={target}
                  placement="bottom"
                  container={ref.current}
                  containerPadding={20}
                  
                >
                  <Popover className="max-content-width" >
                    <Popover.Title><div style={{ display: "flex" }}><Button variant="outline-secondary" size="sm" type="button" style={{ marginRight: "auto" }} onClick={clearCalendar}>Clear</Button><Button variant="outline-secondary" size="sm" type="button" style={{ marginLeft: "auto" }} onClick={closeCalender}>X</Button></div>
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
            {/* <div className="d-flex mt">
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
            </div> */}
            {/* <div className="d-flex mt">
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
            </div> */}
          </Form>
        </div>


        {loading && <LoadingDialog size="sm" />}

        {(!loading && noResults && searchTerm.length > 0) &&
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center">
                <div className="h6">No Results found</div>
              </div>
            </div>
          </div> 
        }

        {Object.keys(logData).length > 0 && (filterType == "blueprint" ? <BlueprintSearchResult searchResults={logData.hits} /> : <LogSearchResult searchResults={logData.hits} />  )}
        {Object.keys(logData).length > 0 && (filterType == "commit" ? <CommitSearchResult searchResults={logData.hits} /> : "")}
        {Object.keys(logData).length > 0 && filterType != "blueprint" && filterType!== "commit" && !noResults? <Pagination total={logData.total.value || 30} currentPage={currentPage} pageSize={pageSize} onClick={(pageNumber, pageSize) => gotoPage(pageNumber, pageSize)} /> : ""}

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
