import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import socketIOClient from "socket.io-client";
import { SteppedLineTo } from "react-lineto";
import { Row, Col, Button, Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faArchive, faPlay, faSync, faSpinner, faStopCircle, faHistory, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "../common/modal";
import PipelineActions from "./actions";
import PipelineWorkflowItem from "./pipelineWorkflowItem";
import "./workflows.css";

const PipelineWorkflowDetail = (props) => {
  const { data, parentCallback, role } = props;
  const [error, setErrors] = useState();
  const [modalHeader, setModalHeader] = useState("");
  const contextType = useContext(AuthContext);
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});
  const [nextStep, setNextStep] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [socketRunning, setSocketRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [showPipelineDataModal, setShowPipelineDataModal] = useState(false);
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
   

  useEffect(() => {    
    if (data.workflow !== undefined) {
      setState({ items: data.workflow.plan });
      setLastStep(data.workflow.last_step);
      setNextStep(calculateNextStep(data.workflow.last_step));

      if (data !== undefined && data.workflow.last_step !== undefined) {
        let status = data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;
        setWorkflowStatus(status);
        if (status === "running" && !socketRunning) {
          subscribeToTimer();
        }        
      } else {
        setWorkflowStatus(false);        
      }      
    }

  }, [data]);


  let tmpDataObject = {};
  let staleRefreshCount = 0;
  const subscribeToTimer = () => {    
    const socket = socketIOClient(endPointUrl, { query: "pipelineId=" + data._id });
    console.log("Connected status before onConnect", socket.socket ? socket.socket.connected : socket.socket === undefined );

    setSocketRunning(true);
    
    if (socket.socket === undefined ) {
      socket.emit("subscribeToPipelineActivity", 1000);
      socket.on("subscribeToPipelineActivity", dataObj => {
        console.log("Update from Websocket (staleRefreshCount: "+staleRefreshCount+"): ", dataObj);
        if (_.isEqual(dataObj, tmpDataObject)) {
          staleRefreshCount++;
        } else {
          staleRefreshCount = 0;
        }  
        tmpDataObject = dataObj;
        let status =  data.workflow.last_step !== undefined && data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;

        if (staleRefreshCount >= 100) {
          console.log("closing connection due to stale data");
          setWorkflowStatus(false);
          setSocketRunning(false);
          socket.close();
        } else {          
          setWorkflowStatus(status);
        }
           
        if (typeof(dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
          data.workflow.last_step = dataObj;
          setLastStep(dataObj);
        }

        if (staleRefreshCount > 5 && status === "stopped") {
          console.log("closing connection due to stopped status");
          setWorkflowStatus(false);
          setSocketRunning(false);
          socket.close();
        }

      });
    }

    socket.on("disconnect", () => {
      setWorkflowStatus(false);
      setSocketRunning(false);
    });

    socket.on("connect_error", function(err) {
      console.log("Connection Error on Socket:", err);
      setWorkflowStatus(false);
      setSocketRunning(false);
      socket.close();
    });
  };

  
  const calculateNextStep = (last_step) => {
    let nextStep = {};    
    if (last_step && last_step.hasOwnProperty("running")) {
      let runningStepId = typeof(last_step.running.step_id) !== "undefined" && last_step.running.step_id.length > 0 ? last_step.running.step_id : false;
      let stepArrayIndex = data.workflow.plan.findIndex(x => x._id.toString() === runningStepId); 
      setCurrentStepIndex(stepArrayIndex);
      nextStep = data.workflow.plan[stepArrayIndex + 1];
     
    } else if (last_step && last_step.hasOwnProperty("success")) {
      let lastSuccessStepId = typeof(last_step.success.step_id) !== "undefined" && last_step.success.step_id.length > 0 ? last_step.success.step_id : false;
      let stepArrayIndex = data.workflow.plan.findIndex(x => x._id.toString() === lastSuccessStepId); 
      setCurrentStepIndex(stepArrayIndex);
      nextStep = data.workflow.plan[stepArrayIndex + 1];

    } else {
      nextStep = data.workflow.plan[0];
    }
    return nextStep;
  };


  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };


  const handleRefreshClick = async (pipelineId, stepNext) => {
    await fetchStatusData(pipelineId, stepNext);
    setTimeout(subscribeToTimer(), 5000); // delay this by 5 seconds to allow time for services to spin up
  };


  const handleStopWorkflowClick = async (pipelineId) => {
    const { getAccessToken } = contextType;
    const response = await PipelineActions.cancel(pipelineId, getAccessToken);
    setWorkflowStatus(false);
    await fetchStatusData(pipelineId);

    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    }     
  };
  

  const handleRunPipelineClick = async (pipelineId, oneStep) => {
    await runPipeline(pipelineId, oneStep);
    setWorkflowStatus("running");    
  };


  async function fetchStatusData(pipelineId, stepNext) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/status`;
    if (stepNext) {
      apiUrl = apiUrl + "?run=true";
    }   
    
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl);
      console.log(pipelineActivityLog);
      parentCallback();
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);      
    }
  }


  async function runPipeline(pipelineId, oneStep) {
    const { getAccessToken } = contextType;
    const postBody = {
      "oneStep": oneStep
    };
    const response = await PipelineActions.run(pipelineId, postBody, getAccessToken);
    console.log(response);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    } else {
      setWorkflowStatus("running");
      setTimeout(function () {
        subscribeToTimer();
      }, 5000);      
    }   
  }


  async function fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    let apiUrl = `/pipelines/${pipelineId}/activity`;
    const params = { 
      tool: tool, 
      step_id: stepId,
      id: activityId
    };
    
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl, { params });
      console.log(pipelineActivityLog);     
      return pipelineActivityLog;
    }
    catch (err) {
      console.log(err.message);
      return false;      
    }
  }


  const handleViewPipelineClick = (param) => {
    setShowPipelineDataModal(param);
  };


  const callbackFunction = (item) => {
    window.scrollTo(0, 0);
    item.id = data._id;
    parentCallback(item);
  };


  const handleSourceEditClick = () => {
    parentCallback({ id: data._id, type: "source", item_id: "" });
  };


  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    //get activity data, filtered by tool!
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data);
        setShowModal(true);
      }    
    }    
  };

  return (
    <>      
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>

          <div className="ml-4 mb-4 w-100 max-content-module-width-50">           
            <h5>{data.name}            
              <Badge variant="secondary" pill className="ml-3 mb-1"> Steps: {currentStepIndex + 1} / {data.workflow ? data.workflow.plan.length : null }</Badge>
            </h5>
            <div className="my-3 text-right">
              {workflowStatus === "running" ? 
                <>
                  <Button variant="outline-dark" size="sm" className="mr-2" disabled>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
                  <Button variant="outline-danger" size="sm" className="mr-2" 
                    onClick={() => { handleStopWorkflowClick(data._id); }}
                    disabled={role !== "administrator"}>
                    <FontAwesomeIcon icon={faStopCircle} className="mr-1"/>Stop Pipeline</Button>
                </>
                :
                <>
                  { nextStep === undefined || nextStep === data.workflow.plan[0] ?
                    <Button variant="success" size="sm" className="mr-2" 
                      onClick={() => { handleRunPipelineClick(data._id); }}
                      disabled={role !== "administrator"}>
                      <FontAwesomeIcon icon={faPlay} className="mr-1"/>Start Pipeline</Button>
                    :
                    <>
                      <Button variant="success" size="sm" className="mr-2" 
                        onClick={() => { handleRunPipelineClick(data._id); }}
                        disabled={role !== "administrator"}>
                        <FontAwesomeIcon icon={faPlay} className="mr-1"/>Continue Pipeline</Button>

                    </>}
                  { data.workflow.hasOwnProperty("last_step") && ( 
                    data.workflow.last_step.hasOwnProperty("success") || 
                    data.workflow.last_step.hasOwnProperty("running") || 
                    data.workflow.last_step.hasOwnProperty("failed")) ?
                    <Button variant="outline-primary" size="sm" className="mr-2" 
                      onClick={() => { handleStopWorkflowClick(data._id); }}
                      disabled={role !== "administrator"}>
                      <FontAwesomeIcon icon={faHistory} className="mr-1"/>Reset Pipeline</Button> : null}
                </>
              }
              <Button variant="outline-warning" size="sm" className="mr-2" onClick={() => { handleRefreshClick(data._id); }}>
                <FontAwesomeIcon icon={faSync} className="fa-fw"/></Button>                            
            </div>             
          </div>

          <div className="workflow-container ml-4 px-3 max-content-module-width-50">
            <div className="p-2 mb-2">
              <FontAwesomeIcon icon={faSearchPlus}
                className="mr-1 mt-1 float-right text-muted"
                style={{ cursor: "pointer" }}
                onClick= {() => { handleViewPipelineClick(data); }} />
            </div>
            

            <div className="source workflow-module-container workflow-module-container-width-sm">
              <h6>Start of Workflow</h6>
              {!data.workflow.source.service ? <div>Source Repository</div> : null }
              {data.workflow.source.name ? <Row>
                <Col><span className="text-muted">Project:</span> {data.workflow.source.name}</Col>               
              </Row> : null }
              {data.workflow.source.service ? <Row className="mt-1 upper-case-first">
                <Col><span className="text-muted">Service:</span> {data.workflow.source.service}</Col>               
              </Row> : null }
              {data.workflow.source.repository ? <Row className="mt-1">
                <Col><span className="text-muted">Repository:</span> {data.workflow.source.repository}</Col>                               
              </Row> : null }
              {data.workflow.source.branch ? <Row className="mt-1">
                <Col><span className="text-muted">Branch:</span> {data.workflow.source.branch}</Col>               
              </Row> : null }

              <Row className="mt-1">
                <Col className="text-muted small">Trigger: {data.workflow.source.trigger_active ? "Enabled": "Disabled"}</Col>
                <Col className="text-right pt-1">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Settings" })} >
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="text-muted mr-2" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewClick(data.workflow.source, "Step Settings"); }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Source Activity Logs" })} >
                    <FontAwesomeIcon icon={faArchive}
                      className="text-muted mr-2" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewSourceActivityLog(data._id, data.workflow.source.service); }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Source Repository" })} >
                    <FontAwesomeIcon icon={faCog}
                      style={{ cursor: "pointer" }}
                      className="text-muted mr-2" fixedWidth
                      onClick={() => { handleSourceEditClick(); }} />  
                  </OverlayTrigger>                          
                 
                </Col>
              </Row>
            </div>

            <div style={{ height: "40px" }}>&nbsp;</div>

            <div className="step-items workflow-module-container-width mx-auto">
              <ItemList 
                items={state.items} 
                lastStep={lastStep} 
                nextStep={nextStep} 
                pipelineId={data._id} 
                parentCallback={callbackFunction} 
                parentHandleViewSourceActivityLog={handleViewSourceActivityLog} />             
            </div>
            <SteppedLineTo from="source" to="step-items" orientation="v" borderColor="#226196" borderWidth={2} fromAnchor="bottom" toAnchor="top" />

            <div className="workflow-module-container workflow-module-container-width-sm pt-2 mb-4 text-center mx-auto h6">
            End of Workflow
            </div>
          </div>
          {showModal ? <Modal header={modalHeader}
            jsonMessage={modalMessage}
            jsonView="true"
            button="OK"
            size="lg"
            handleCancelModal={() => setShowModal(false)}
            handleConfirmModal={() => setShowModal(false)} /> : null}
        </> : null }

      {showPipelineDataModal ? <Modal header="Pipeline Details"
        jsonMessage={showPipelineDataModal}
        jsonView="true"
        button="OK"
        size="lg"
        handleCancelModal={() => setShowPipelineDataModal(false)}
        handleConfirmModal={() => setShowPipelineDataModal(false)} /> : null}

    </>
  );
};



const ItemList = React.memo(function ItemList({ items, lastStep, nextStep, pipelineId, parentCallback, parentHandleViewSourceActivityLog }) {
  const callbackFunction = (param) => {
    parentCallback(param);
  };

  const setStepStatusClass = (last_step, item_id) => {

    if (typeof(last_step) !== "undefined") {
      if(typeof(last_step.success) !== "undefined" && last_step.success.step_id === item_id) {
        return "workflow-step-success step-"+item_id;
      }
      else if(typeof(last_step.running) !== "undefined" && last_step.running.step_id === item_id) {
        return "workflow-step-running step-"+item_id;
      }
      else if(typeof(last_step.failed) !== "undefined" && last_step.failed.step_id === item_id) {
        return "workflow-step-failure step-"+item_id;
      } else {
        return "step-"+item_id;
      }
    }
  }; 


  return items.map((item, index) => (
    <div key={item._id}>
      <div className={"workflow-module-container workflow-module-container-width mx-auto " + setStepStatusClass(lastStep, item._id)}>
        <PipelineWorkflowItem 
          item={item} 
          index={index}          
          lastStep={lastStep} 
          pipelineId={pipelineId} 
          nextStep={nextStep} 
          parentCallback={callbackFunction} 
          parentHandleViewSourceActivityLog={parentHandleViewSourceActivityLog} />
      </div>
      {/* <div className="text-center py-1">
        <FontAwesomeIcon icon={faArrowAltCircleDown} size="lg" className="nav-blue"/>            
      </div> */}
      <div style={{ height: "30px" }} className={"step-"+ index}>&nbsp;</div>
      
      <SteppedLineTo from={"step-"+item._id} to={"step-"+ index} orientation="v" borderColor="#226196" borderWidth={2} fromAnchor="bottom" toAnchor="bottom" />

    </div>
  ));
});

function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineWorkflowDetail.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func,
  role: PropTypes.string
};

ItemList.propTypes = {
  items: PropTypes.array,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func
};


export default PipelineWorkflowDetail;