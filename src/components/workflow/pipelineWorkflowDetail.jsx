import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import socketIOClient from "socket.io-client";
import { SteppedLineTo } from "react-lineto";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faArchive, faPlay, faSync, faSpinner, faStopCircle, faHistory, faPlusSquare, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modalActivityLogs";
import PipelineActions from "./actions";
import PipelineWorkflowItemList from "./pipelineWorkflowItemList";
import "./workflows.css";

const PipelineWorkflowDetail = (props) => {
  const { data, parentCallback, role } = props;
  const [error, setErrors] = useState();
  const [userInfo, setUserInfo] = useState();
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
  const [editWorkflow, setEditWorkflow] = useState(false);
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
   

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await checkAuthentication();
        await loadFormData(data);                
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {     
      controller.abort();      
    };
  }, [data]);

  const loadFormData = async (step) => {
    if (step.workflow !== undefined) {
      setState({ items: step.workflow.plan });
      setLastStep(step.workflow.last_step);
      setNextStep(calculateNextStep(step.workflow.last_step));

      if (step !== undefined && step.workflow.last_step !== undefined) {
        let status = step.workflow.last_step.hasOwnProperty("status") ? step.workflow.last_step.status : false;
        setWorkflowStatus(status);
        if (status === "running" && !socketRunning) {
          subscribeToTimer();
        }        
      } else {
        setWorkflowStatus(false);        
      }      
    }
  };

  async function checkAuthentication ()  {
    const { getUserSsoUsersRecord } = contextType;
    try {
      const userInfoResponse = await getUserSsoUsersRecord();      
      if (userInfoResponse !== undefined && Object.keys(userInfoResponse).length > 0) {
        setUserInfo(userInfoResponse);            
      }
    }
    catch (err) {
      console.log("Error occurred getting user authentication status.", err);
    }    
  }


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

        if (staleRefreshCount >= 50) {
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
    setModalHeader("Pipeline Details");
    setModalMessage(param);
    setShowModal(true);
  };


  const callbackFunctionEditItem = (item) => {
    window.scrollTo(0, 0);
    item.id = data._id;
    parentCallback(item);
  };


  async function updatePipeline(pipeline) {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${data._id}/update`;   
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  const handleSourceEditClick = () => {
    parentCallback({ id: data._id, type: "source", item_id: "" });
  };

  const handleEditWorkflowClick = () => {
    setEditWorkflow(!editWorkflow);
  };

  const handleSaveWorkflowEditsClick = async () => {
    console.log("saving plan: ", data.workflow.plan);
    setEditWorkflow(!editWorkflow);
    await updatePipeline(data);  
    parentCallback(); //refreshes items
  };

  const handleCancelWorkflowEditsClick = () => {
    setEditWorkflow(!editWorkflow);
    parentCallback(); //refreshes workflow object from DB
  };

  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    //get activity data, filtered by tool!
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data[0]);
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
              {/* <Badge variant="secondary" pill className="ml-3 mb-1"> Steps: {currentStepIndex + 1} / {data.workflow ? data.workflow.plan.length : null }</Badge> */}
            </h5>

            { _configuredToolsCount(data.workflow.plan) > 0 ?             
              <div className="my-3 text-right">
                {workflowStatus === "running" ? 
                  <>
                    <Button variant="outline-dark" className="mr-2" disabled>
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
                    <Button variant="outline-danger" className="mr-2" 
                      onClick={() => { handleStopWorkflowClick(data._id); }}
                      disabled={role !== "administrator"}>
                      <FontAwesomeIcon icon={faStopCircle} className="mr-1"/>Stop Pipeline</Button>
                  </>
                  :
                  <>
                    { nextStep === undefined || nextStep === data.workflow.plan[0] ?
                      <Button variant="success" className="mr-2" 
                        onClick={() => { handleRunPipelineClick(data._id); }}
                        disabled={role !== "administrator"}>
                        <FontAwesomeIcon icon={faPlay} className="mr-1"/>Start Pipeline</Button>
                      :
                      <>
                        <Button variant="success" className="mr-2" 
                          onClick={() => { handleRunPipelineClick(data._id); }}
                          disabled={role !== "administrator"}>
                          <FontAwesomeIcon icon={faPlay} className="mr-1"/>Continue Pipeline</Button>

                      </>}
                    { data.workflow.hasOwnProperty("last_step") && ( 
                      data.workflow.last_step.hasOwnProperty("success") || 
                    data.workflow.last_step.hasOwnProperty("running") || 
                    data.workflow.last_step.hasOwnProperty("failed")) ?
                      <Button variant="outline-primary" className="mr-2" 
                        onClick={() => { handleStopWorkflowClick(data._id); }}
                        disabled={role !== "administrator"}>
                        <FontAwesomeIcon icon={faHistory} className="mr-1"/>Reset Pipeline</Button> : null}
                  </>
                }
                <Button variant="outline-warning" className="mr-2" onClick={() => { handleRefreshClick(data._id); }}>
                  <FontAwesomeIcon icon={faSync} className="fa-fw"/></Button>                            
              </div> : null }          
          </div>

          <div className="workflow-container ml-4 px-3 max-content-module-width-50">
            { userInfo._id === data.owner ? 
              <div className="p-2 mb-2 text-right">
                {editWorkflow ?
                  <>
                    <FontAwesomeIcon icon={faSave}
                      className="mr-3 mt-1 green"
                      size="lg"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleSaveWorkflowEditsClick(); }} /> 
                    <FontAwesomeIcon icon={faTimes}
                      className="mr-3 mt-1 dark-grey"
                      size="lg"
                      style={{ cursor: "pointer" }}
                      onClick= {() => { handleCancelWorkflowEditsClick(); }} /> 
                  </>:
                  <FontAwesomeIcon icon={faCog}
                    className="mr-3 mt-1 text-muted"
                    size="lg"
                    style={{ cursor: "pointer" }}
                    onClick= {() => { handleEditWorkflowClick(); }} />
                }

                <FontAwesomeIcon icon={faSearchPlus}
                  className="mr-1 mt-1 text-muted"
                  size="lg"
                  style={{ cursor: "pointer" }}
                  onClick= {() => { handleViewPipelineClick(data); }} />
              </div> : null }
            

            <div className="source workflow-module-container workflow-module-container-width-sm p-2">
              <div className="title-text title-text-divider">Start of Workflow</div>
              {!data.workflow.source.service ? <div className="mt-1">Source Repository</div> : null }
              
              {data.workflow.source.name ?
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Project:</span> {data.workflow.source.name}</div>            
                </div> : null }
              {data.workflow.source.service ? 
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Service:</span> {data.workflow.source.service}</div>            
                </div> : null }
              {data.workflow.source.repository ? 
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Repository:</span> {data.workflow.source.repository}</div>            
                </div> : null }
              {data.workflow.source.branch ? 
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Branch:</span> {data.workflow.source.branch}</div>            
                </div> : null }
              
              <div className="d-flex">
                <div className="p-1"></div>
              </div>

              <div className="d-flex align-items-end flex-row">
                <div className="text-left"><span className="text-muted small">Trigger: {data.workflow.source.trigger_active ? "Enabled": "Disabled"}</span></div>
                <div className="p-2"></div>
                <div className="ml-auto text-right">
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
                </div>
              </div>
            </div>

            <div style={{ height: "40px" }}>&nbsp;</div>

            <div className="step-items workflow-module-container-width mx-auto">
              <PipelineWorkflowItemList 
                items={state.items} 
                lastStep={lastStep} 
                nextStep={nextStep} 
                editWorkflow={editWorkflow}
                pipelineId={data._id} 
                setStateItems={setState}
                parentCallbackRefreshItems={parentCallback}
                parentCallbackEditItem={callbackFunctionEditItem} 
                parentHandleViewSourceActivityLog={handleViewSourceActivityLog} />             
            </div>
            <SteppedLineTo from="source" to="step-items" orientation="v" borderColor="#226196" borderWidth={2} fromAnchor="bottom" toAnchor="top" />

            <div className="workflow-module-container workflow-module-container-width-sm pt-2 mb-4 text-center mx-auto h6">
            End of Workflow
            </div>
          </div>          
          
        </> : null }
      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
    </>
  );
};



const _configuredToolsCount = (array) => {
  let toolsCount = 0;
  array.map((item) => {
    if (item.tool !== undefined) {
      if ((item.tool.tool_identifier !== undefined && item.tool.tool_identifier !== "") || item.tool.configuration !== undefined) {
        toolsCount++;
      }
    }      
  });  
  return toolsCount; 
};

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




export default PipelineWorkflowDetail;