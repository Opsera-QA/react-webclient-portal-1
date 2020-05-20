import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import InfoDialog from "components/common/info";
import ErrorDialog from "components/common/error";
import { Form, Button, Alert, Table, Overlay, Popover } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { DateRangePicker } from "react-date-range";
import ModalLogs from "components/common/modalLogs";
import DropdownList from "react-widgets/lib/DropdownList";
import Multiselect from "react-widgets/lib/Multiselect";

const Highlight = require("react-highlighter");

function SearchLogs ( { tools }) {
  //const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }, { value: "blueprint", label: "Build Blueprint" }];
  const FILTER = tools;
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [data, setData] = useState([]);
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

  const handleFormSubmit = e => {
    submitClicked(true);
    e.preventDefault();
    setData([]);  
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
      fetchData(searchTerm, filterType, startDate, endDate);    
    } else {
      setLoading(false);
      setData([]);
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
    setData([]);
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
    setData([]);
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


  const fetchData = async (search, filter, startDate, endDate) => {
    let jsonToPost = {};
    jsonToPost.index = filter;
    jsonToPost.customFilter = getFormattedCustomFilters();
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const urlParams = {
      search: search,
      date: (startDate !== 0 && endDate === 0) ? startDate : undefined,
      start: (startDate !== 0 && endDate !== 0) ? startDate : undefined,
      end: (startDate !== 0 && endDate !== 0) ? endDate : undefined,
      filter: jsonToPost
    };
    const apiCall = new ApiService("/analytics/search", urlParams, accessToken);
    let result = await apiCall.get()
      .catch(function (error) {
        setData([]);
        // setErrors(error.toJSON());
      });
    let searchResults = [];
    if (result) {
      searchResults = result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits.hits : [];
    }
    console.log(searchResults);
    setNoResults(searchResults.length === 0);
    setData(searchResults);
    setLoading(false);
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


        <MapLogData data={data} type={filterType} />

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


const MapLogData = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const { data, type } = props;

  const handleClick = (param) => {
    setModalMessage(param);
    setShowModal(true);
  };
  // if (type === "pipeline" && data.length > 0) { 
  //   console.log(data);
  //   return (
  //     <>
  //       <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
  //         <thead>
  //           <tr>
  //             <th style={{ width: "15%" }}>Job Name</th>
  //             <th style={{ width: "15%" }}>Project</th>
  //             <th style={{ width: "45%" }}>Entry</th>
  //             <th style={{ width: "6.25%" }}>Date</th>
  //             <th className="text-center" style={{ width: "6.25%" }}>Build Number</th>
  //             <th className="text-center" style={{ width: "6.25%" }}>Source Host</th>
  //             <th className="text-center" style={{ width: "6.25%" }}>Source</th>
  //           </tr>
  //         </thead>
  //         <tbody>
            
  //           {data.map((item, idx) => (
  //             <tr key={idx} >
  //               <td className="force-text-wrap">{typeof(item._source.data) !== "undefined" ? item._source.data.buildVariables.JOB_NAME : null}</td>
  //               <td className="force-text-wrap">{typeof(item._source.data) !== "undefined" ? item._source.data.projectName : null}</td>
  //               <td className="force-text-wrap">{item._index}: {item._source.message ? item._source.message[0] : null}
  //                 <FontAwesomeIcon icon={faSearchPlus}
  //                   className="ml-1"
  //                   size="xs"
  //                   style={{ cursor: "pointer" }}
  //                   onClick={() => { handleClick(item._source.data); }} /></td> 
  //               <td>{format(new Date(typeof(item._source["@timestamp"]) !== "undefined" ? item._source["@timestamp"] : null), "yyyy-MM-dd', 'hh:mm a")}</td>          
  //               <td className="text-center">{typeof(item._source.data) !== "undefined" ? item._source.data.buildNum : null}</td>      
  //               <td className="text-center">{typeof(item._source["source_host"]) !== "undefined" ? item._source["source_host"] : null}</td>
  //               <td className="text-muted text-center">{typeof(item._source["source"]) !== "undefined" ? item._source["source"] : null}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </Table>

  //       {showModal ? <Modal header="Log Details"
  //         message={<pre>{JSON.stringify(modalMessage, null, 2)}</pre>}
  //         button="OK"
  //         size="lg"
  //         handleCancelModal={() => setShowModal(false)}
  //         handleConfirmModal={() => setShowModal(false)} /> : null}
  //     </>
  //   );
  // } else 

  if (type === "blueprint" && data.length > 0) {
    return (
      <>
        <Table striped bordered hover className="mt-4 table-sm" style={{ fontSize:"small" }}>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Build</th>
              <th style={{ width: "5%" }}>Environment</th>
              <th style={{ width: "20%" }}>Date</th>
              <th style={{ width: "10%" }}>Tool</th>
              <th style={{ width: "30%" }}>Message</th>
              <th style={{ width: "25%" }}>Git Commit ID</th>
              <th style={{ width: "5%" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            
            {data.map((item, idx) => (
              <tr key={idx} >
                <td>{item["build_number"]}
                  <FontAwesomeIcon icon={faSearchPlus}
                    className="ml-1"
                    size="xs"
                    style={{ cursor: "pointer" }}
                    onClick= {() => { handleClick(item); }} /></td>
                <td className="force-text-wrap upper-case-all">{item["Release Environment"]}</td> 
                <td>{format(new Date(item["time"]), "yyyy-MM-dd', 'hh:mm a")}</td>                
                <td className="upper-case-first">{item["tool"]}</td>
                <td className="force-text-wrap">{item["message"]}</td>
                <td className="force-text-wrap">{item["Git Commit ID"]}</td>
                <td className="upper-case-all">{item["status"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <ModalLogs header={"Build Number: " + modalMessage.build_number} size="lg" jsonMessage={modalMessage} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
      </>
    );
  }
  else {
    return (
      <>
        {data.map((item, idx) => (
          <div key={idx}>
            <Alert>
              <div className="row mb-3">
                <FontAwesomeIcon icon={faSearchPlus}
                  className="mt-1"
                  size="sm"
                  style={{ cursor: "pointer", alignItems: "flex-end" }}
                  onClick= {() => { handleClick(item); }} />
                <strong className="ml-2">{format(new Date(typeof(item._source["@timestamp"]) !== "undefined" ? item._source["@timestamp"] : null), "yyyy-MM-dd', 'hh:mm a")}</strong>
                { (item._source.data) ? <strong className="ml-4">Job Name: {typeof(item._source.data.buildVariables) !== "undefined" ? item._source.data.buildVariables.JOB_NAME : "N/A"}</strong> : ""}
                { (item._source.data) ? <strong className="ml-4">Build Number: {typeof(item._source.data.buildNum) !== "undefined" ? item._source.data.buildNum : "N/A"}</strong> : ""}

              </div>
              <div className="row ml-2" style={{ lineHeight: 2 }}>
                <Highlight matchClass="react-highlighter-lightgray" search={/".*?":/}>{JSON.stringify(item, null, 2).substring(0, 1000)}</Highlight>
              </div>
            </Alert>
            <hr style={{ color: "#E5E7E9", backgroundColor: "#E5E7E9", borderColor : "#E5E7E9" }} />            
          </div>
        ))}
        <ModalLogs header={modalMessage._index} size="lg" jsonMessage={modalMessage} dataType="bar" show={showModal} setParentVisibility={setShowModal} />
      </>
    );
  }
};

MapLogData.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string
};


export default SearchLogs;
