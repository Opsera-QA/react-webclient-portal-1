import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { ApiService } from "api/apiService";
import LoadingDialog from "components/common/loading";
import InfoDialog from "components/common/info";
import ErrorDialog from "components/common/error";
import { Form, Button, Overlay, Popover, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { format, addDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDraftingCompass, faDownload } from "@fortawesome/free-solid-svg-icons";
import "./logs.css";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css"; 
import { DateRangePicker } from "react-date-range";
import DropdownList from "react-widgets/lib/DropdownList";
import BlueprintSearchResult from "./BlueprintSearchResult";
import simpleNumberLocalizer from "react-widgets-simple-number";
import NumberPicker from "react-widgets/lib/NumberPicker";
import { useHistory } from "react-router-dom";



let runCountFetch = {};
let idFetch = {};

function OPBlueprint (props) {
  //const FILTER = [{ value: "pipeline", label: "Pipeline" }, { value: "metricbeat", label: "MetricBeat" }, { value: "twistlock", label: "TwistLock" }, { value: "blueprint", label: "Build Blueprint" }];
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState(false);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [filterOptions, setFilters] = useState([]);
  const [filterType, setFilterType] = useState("pipeline");
  const [multiFilter, setMultiFilter] = useState([]);
  const [jobFilter, setJobFilter] = useState("");
  const [calenderActivation, setCalenderActivation] = useState(false);
  const [submitted, submitClicked] = useState(false);
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: "selection"  
  //   }
  // ]);
  // const [calendar, setCalendar] = useState(false);
  // const [target, setTarget] = useState(null);
  // const ref = useRef(null);
  // const [sDate, setSDate] = useState("");
  // const [eDate, setEDate] = useState("");
  // const node = useRef();
  const [run_count, setRunCount] = useState(null);
  const [pipeIDerror, setPipeIDError] = useState(false);
  const [runCountError, setRunCountError] = useState(false);
  const history = useHistory();
  const [disabledForm, setDisabledState] = useState(false);


  simpleNumberLocalizer();


  const handleFormSubmit = e => {
    submitClicked(true);
    setPipeIDError(false);
    setRunCountError(false);
    e.preventDefault();
    setLogData([]);  
    // let startDate = 0;
    // let endDate = 0;
    // if (date[0].startDate && date[0].endDate) {
    //   startDate = format(new Date(date[0].startDate), "yyyy-MM-dd");
    //   endDate = format(new Date(date[0].endDate), "yyyy-MM-dd");
      
    //   if (startDate === endDate) {
    //     endDate = 0;
    //   }
    //   if (calenderActivation === false ){
    //     startDate = 0;
    //     endDate = 0;
    //   }
    // }

    // getSearchResults(startDate, endDate);    
    getSearchResults();    


  };

  const cancelSearchClicked = () => {
    
    // setDate([
    //   {
    //     startDate: undefined,
    //     endDate: undefined,
    //     key: "selection"  
    //   }
    // ]);
    // setCalendar(false);
    submitClicked(false);
    setLogData([]);
    setCalenderActivation(false);
    setPipeIDError(false);
    setRunCountError(false);
    // setEDate("");
    // setSDate("");
    setMultiFilter([]);
    setJobFilter("");
    setNoResults(false);
    setRunCount(null);
  };


  // useEffect(() => {

  //   document.addEventListener("mousedown", handleClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  // const handleClick = e => {
  //   if (node && node.current) {
  //     if (node.current.contains(e.target)) {
  //       return;
  //     }
  //   }
  //   setCalendar(false);
  // };

  const getSearchResults = async () => {
    console.log(run_count);
    setLoading(true);
    setLogData([]);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    console.log(run_count);
    console.log(multiFilter);
    let route = "/analytics/blueprint/op";

    if (!multiFilter.value) {
      setPipeIDError(true);
    }

    if (run_count === null || run_count === undefined || run_count === 0) {
      setRunCountError(true);
    }

    const urlParams = {
      // date: (startDate !== 0 && endDate === 0) ? startDate : undefined,
      // start: (startDate !== 0 && endDate !== 0) ? startDate : undefined,
      // end: (startDate !== 0 && endDate !== 0) ? endDate : undefined,
      filter: {
        index: filterType,
        customFilter: {
          id: idFetch[multiFilter.value], 
          run_count: run_count
        }
      },
    };
    const apiCall = new ApiService(route, urlParams, accessToken);
    await apiCall.get().then(result => {
      let searchResults = [];
      if (result) {
        searchResults = result.data.hasOwnProperty("hits") && result.data.hits.hasOwnProperty("hits") ? result.data.hits : [];
      }
      if (searchResults.hits.length === 0 || searchResults.length === 0) {
        setNoResults(true);
        setLoading(false);
      } else {
        setNoResults(false);
        setLogData(searchResults);
      }
      console.log(logData);
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
    const apiCall = new ApiService("/pipelines", {}, accessToken);
    await apiCall.get()
      .then(res => {
        if (res.data.count > 0 || res.data.response.length > 0) {
          let formattedArray = [];
          for (let item in res.data.response) {
            let tempText = res.data.response[item].name;
            runCountFetch[res.data.response[item].name] = res.data.response[item].workflow.run_count;
            idFetch[res.data.response[item].name] = res.data.response[item]._id;
            formattedArray.push({ value: tempText, label: tempText });
          }
          console.log(runCountFetch);
          let filterDataApiResponse = [{
            label: "My Pipelines", 
            options: formattedArray
          }];
          let formattedFilterData = [];
  
          filterDataApiResponse.forEach(filterGroup => {
            filterGroup["options"].map((filters) => {
              filters["type"] = filterGroup["label"];
            });
            formattedFilterData.push(...filterGroup["options"]);
          });
  
          setFilters(formattedFilterData);
        } else {
          setDisabledState(true);
        }
      })
      .catch(err => {
        setFilters([]);
      });
  };

  useEffect(() => {
    setRunCount(runCountFetch[multiFilter.value]);
  }, [multiFilter]);

  //Every time we select a new filter, update the list. But only for blueprint and pipeline
  useEffect(() => {
    fetchFilterData();
  }, []);

  // const toggleCalendar = event => {
  //   console.log(multiFilter);
  //   setCalenderActivation(true);
  //   setCalendar(!calendar);
  //   setTarget(event.target);
  //   if (date[0].startDate && date[0].endDate) {
  //     let startDate = format(new Date(date[0].startDate), "MM/dd");
  //     let endDate = format(new Date(date[0].endDate), "MM/dd");
  //     if (endDate === 0) {
  //       setEDate(startDate);
  //     } else {
  //       setEDate(endDate);
  //     }
  //     setSDate(startDate);
  //   }
  // };

  // const closeCalender = () => {
  //   setCalendar(false);
  //   if (date[0].startDate && date[0].endDate) {
  //     let startDate = format(new Date(date[0].startDate), "MM/dd");
  //     let endDate = format(new Date(date[0].endDate), "MM/dd");
  //     if (endDate === 0) {
  //       setEDate(startDate);
  //     } else {
  //       setEDate(endDate);
  //     }
  //     setSDate(startDate);
  //   }
  // };

  // const dateChange = item => {
  //   console.log(item);
  //   setDate([item.selection]);
  //   if (item.selection) {
  //     let startDate = format(item.selection.startDate, "MM/dd");
  //     let endDate = format(item.selection.endDate, "MM/dd");
  //     if (endDate === 0) {
  //       setEDate(startDate);
  //     } else {
  //       setEDate(endDate);
  //     }
  //     setSDate(startDate);
  //   }
  // };

  // const clearCalendar = () => {
  //   setDate([
  //     {
  //       startDate: undefined,
  //       endDate: undefined,
  //       key: "selection"
  //     }
  //   ]);
  //   setSDate(undefined);
  //   setEDate(undefined);
  // };

  const pipelineSelect = item => {
    setPipeIDError(false);
    setRunCountError(false);
    setMultiFilter(item);
    submitClicked(false);
  };

  const runCountSelect = item => {
    setPipeIDError(false);
    setRunCountError(false);
    console.log(submitted);
    setRunCount(item); 
    submitClicked(false);
  };

  const uniqueSteps = logdata => { 
    let arrayList = [];
    for (let item in logdata.hits) { 
      arrayList.push(logdata.hits[item]._source.data.jobId);
    }
    if (arrayList.length > 0) {
      let setList = new Set(arrayList);
      return setList.size;
    } else {
      return "N/A";
    }

  };

  const goToPipeline = () => {
    history.push("/workflow/" + idFetch[multiFilter.value]);
  };


  if (error) {
    return (<ErrorDialog error={error} />);
  } else {
    return (
      <>
        <div className="max-content-width">
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={5} className="py-1">
                <DropdownList
                  placeholder={"Select Opsera Pipeline"}
                  data={filterOptions} 
                  busy={(disabledForm) ? false : Object.keys(filterOptions).length == 0 ? true : false}
                  disabled={Object.keys(filterOptions).length == 0 ? true : false}
                  valueField='value'
                  textField='label'
                  filter='contains'
                  value={(multiFilter.length === 0) ? null : multiFilter}
                  onChange={pipelineSelect} 
                />
              </Col>
              <Col md={4} className="py-1">
                <NumberPicker 
                  type="number"
                  placeholder={"Run Count"}
                  disabled={disabledForm}
                  value={(run_count) ? run_count : null}
                  className="max-content-width"
                  onChange={runCountSelect}
                  min={0}
                />
                <Form.Text id="passwordHelpBlock" className="ml-1" muted>
    Defaults to latest run of the selected pipeline. Enter custom if required.
                </Form.Text>
              </Col>
              <Col md={3}>
                {/* <Button variant="outline-secondary" type="button" onClick={toggleCalendar}>
                  <FontAwesomeIcon icon={faCalendar} className="mr-1 d-none d-lg-inline" fixedWidth/>
                  {(calendar && sDate || eDate) ? sDate + " - " + eDate : "Date Range"}</Button> */}
                <Button variant="outline-secondary" className="float-right ml-2" type="button" onClick={cancelSearchClicked} disabled={disabledForm}>Clear</Button>
                <Button variant="primary" className="float-right ml-2" type="submit" disabled={disabledForm}>Lookup</Button>
              </Col>


                
              {/* <Overlay
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
                </Overlay> */}
            </Row>
          </Form>
        </div>


        {loading && <LoadingDialog size="sm" />}

        {/* {
          (!loading && noResults) &&
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center">
                <div className="h6">No Results found</div>
              </div>
            </div>
          </div> 
        } */}

        {(!loading  && noResults && submitted && !runCountError && !pipeIDerror) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="No data been recorded for this pipeline run." /></div>   
              </div>
            </div>
          </div> 
        }

        {(!loading && runCountError && !pipeIDerror) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="No Runs have been recorded for this pipeline." /></div>   
              </div>
            </div>
          </div> 
        }

        {(!loading  &&  runCountError && pipeIDerror) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="Please select a pipeline and associated run in order to see results." /></div>   
              </div>
            </div>
          </div> 
        }

        {( !loading  && pipeIDerror && !runCountError) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="Please Select a pipeline in order to see results." /></div>   
              </div>
            </div>
          </div> 
        }

        {( !loading  && disabledForm) && 
          <div style={{ height: "400px" }}>
            <div className="row h-100">
              <div className="col-sm-12 my-auto text-center max-content-width">
                <div className="h6"><InfoDialog  message="No pipeline activity available to report on" /></div>   
              </div>
            </div>
          </div> 
        }


        {submitted && Object.keys(logData).length > 0 && logData.hits.length > 0 ? 
          <>
            <div className="mt-3 bordered-content-block p-3 max-content-width"> 
              <Row>
                <Col><strong><div className="blueprint-title">  {(Object.keys(multiFilter).length > 0) ? multiFilter.value : "N/A"}</div></strong></Col>
                <Button variant="outline-dark mr-3" size="sm" onClick={() => { goToPipeline(); }}><FontAwesomeIcon icon={faDraftingCompass} fixedWidth/>View Pipeline</Button>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Blueprint Export Coming Soon." })} >
                  <Button variant="outline-secondary mr-3" size="sm" onClick={() => { goToPipeline(); }} disabled><FontAwesomeIcon icon={faDownload} fixedWidth/></Button>
                </OverlayTrigger>

              </Row>
              <hr />
              <Row className="mt-1">
                <Col lg className="py-1"><span className="text-muted mr-1">ID:</span> {(Object.keys(multiFilter).length > 0 && Object.keys(idFetch).length) > 0 ? idFetch[multiFilter.value] : "N/A"}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Pipeline Run Count:</span> {logData.hits[0]._source.data.run_count || "N/A"}</Col>
              </Row>
              <Row className="mt-1">
                <Col lg className="py-1"><span className="text-muted mr-1">Last Run: </span> {logData.hits[0]._source["@timestamp"]}</Col>
                <Col lg className="py-1"><span className="text-muted mr-1">Number of Steps:</span> {uniqueSteps(logData) || "N/A"}</Col>
              </Row>
            </div>
            <BlueprintSearchResult searchResults={logData.hits} />  
          </>
        
          : "" }
      </>
    );
  }
}

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}


export default OPBlueprint;
