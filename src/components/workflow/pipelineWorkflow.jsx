import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import socketIOClient from "socket.io-client";
import { SteppedLineTo } from "react-lineto";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faFileAlt, faCog, faPen, faArchive, faPlay, faSync, faSpinner, faStopCircle, faHistory, faCheck, faPause, faFlag, faClipboardCheck, faCodeBranch, faFileCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modalActivityLogs";
import PipelineActions from "./actions";
import PipelineWorkflowItemList from "./pipelineWorkflowItemList";
import isEqual from "lodash.isequal";
import ApprovalModal from "./approvalModal";
import Modal from "../common/modal";
import "./workflows.css";

const PipelineWorkflow = (props) => {
  const { data, fetchPlan, role, editItemId } = props;
  const [error, setErrors] = useState();
  const [userInfo, setUserInfo] = useState();
  const [modalHeader, setModalHeader] = useState("");
  const contextType = useContext(AuthContext);
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});  
  const [socketRunning, setSocketRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [accessToken, setAccessToken] = useState();
  const [infoModal, setInfoModal] = useState({ show:false, header: "", message: "", button: "OK" });
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isSavingPipeline, setIsSavingPipeline] = useState(false);
  
  //Feature Flag
  const [previewRole, setPreviewRole] = useState(false);
  const getRoles = async () => {
    const { getIsPreviewRole } = contextType; 
    //this returns true IF the Okta groups for user contains "Preview".  Please wrap display components in this.
    const isPreviewRole = await getIsPreviewRole();
    setPreviewRole(isPreviewRole);
    if (isPreviewRole) {
      console.log("Enabling Preview Feature Toggle. ", isPreviewRole);
    }    
  };


  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await getRoles();
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
  }, [data, editItemId]);

  const loadFormData = async (data) => {
    //setEditWorkflow(false);
    if (data.workflow !== undefined) {
      setState({ items: data.workflow.plan });
      setLastStep(data.workflow.last_step);
      //setNextStep(calculateNextStep(step.workflow.last_step));

      if (data !== undefined && data.workflow.last_step !== undefined) {
        let status = data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;

        if (status === "stopped" && data.workflow.last_step.running.paused) {
          setWorkflowStatus("paused");
        } else {
          setWorkflowStatus(status);
        }
        
        if (status === "running" && !socketRunning) {
          subscribeToTimer();
        }        
      } else {
        setWorkflowStatus(false);        
      }      
    }
  };

  async function checkAuthentication ()  {
    const { getUserSsoUsersRecord, getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);
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
        if (isEqual(dataObj, tmpDataObject)) {
          staleRefreshCount++;
        } else {
          staleRefreshCount = 0;
        }  
        tmpDataObject = dataObj;
        let status =  data.workflow.last_step !== undefined && data.workflow.last_step.hasOwnProperty("status") ? data.workflow.last_step.status : false;

        if (staleRefreshCount >= 20) {
          console.log("closing connection due to stale data");
          setWorkflowStatus(false);
          setSocketRunning(false);
          socket.close();
        } else {          
          if (status === "stopped" && data.workflow.last_step.running.paused) {
            setWorkflowStatus("paused");
          } else {
            setWorkflowStatus(status);
          }
        }
           
        if (typeof(dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
          data.workflow.last_step = dataObj;
          setLastStep(dataObj);
        }

        if (staleRefreshCount > 3 && status === "stopped") {
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

  const handleApprovalClick = () => {
    setShowApprovalModal(true);    
  };

  const handleApprovalActivity = () => {
    setInfoModal({ show:true, header: "Approval Status", message: "Your approval action has been recorded in this pipeline's Activity Logs.  The pipeline will resume operations shortly.", button: "OK" });
    setWorkflowStatus("running");  
    subscribeToTimer();
  };

  async function fetchStatusData(pipelineId, stepNext) {
    let apiUrl = `/pipelines/${pipelineId}/status`;
    if (stepNext) {
      apiUrl = apiUrl + "?run=true";
    }   
    
    try {
      const pipelineActivityLog = await axiosApiService(accessToken).get(apiUrl);
      console.log(pipelineActivityLog);
      fetchPlan();
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
    setModalHeader("Pipeline Configuration");
    setModalMessage(param);
    setShowModal(true);
  };

  const callbackFunctionEditItem = (item) => {
    window.scrollTo(0, 0);    
    setEditWorkflow(false);
    item.id = data._id;
    fetchPlan(item);
  };

  async function updatePipeline(pipeline) {
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
    fetchPlan({ id: data._id, type: "source", item_id: "" });
  };

  const handleEditWorkflowClick = () => {
    setEditWorkflow(true);
  };

  const handleDoneWorkflowEditsClick = async () => {
    setIsSavingPipeline(true);
    await fetchPlan();  
    setIsSavingPipeline(false);
    setEditWorkflow(false);  
  };

  const quietSavePlan = async () => {
    console.log("saving plan: ", data.workflow.plan);
    await updatePipeline(data);      
  };

  const handleViewSourceActivityLog = async (pipelineId, tool, stepId, activityId) => {
    if (tool) {
      const activityData = await fetchPipelineActivityByTool(pipelineId, tool, stepId, activityId);
      if (activityData && activityData.data) {
        setModalHeader("Step Activity Log");
        setModalMessage(activityData.data.pipelineData[0]);
        setShowModal(true);
      }    
    }    
  };

  return (
    <>      
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>
          <div className="mb-2 w-100 max-content-module-width-50">           
            <div className="title-text-5 mt-2">{data.name}</div>     
          </div>


          <ul className="nav nav-tabs w-100" style={{ borderBottom: "none" }}>
            <li className="nav-item">
              <Link className="nav-link" 
                to={location => `/workflow/${data._id}`}>Summary</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" 
                to={location => `/workflow/${data._id}/model`}>Workflow</Link>
            </li>
          </ul>


          <div className="workflow-container pl-2 max-content-module-width-50">
            <div className="pr-1 my-2 text-right">
              {workflowStatus === "running" && 
                <>
                  <Button variant="outline-dark" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
                  <Button variant="outline-danger" className="mr-1"  size="sm" onClick={() => { handleStopWorkflowClick(data._id); }}
                    disabled={role !== "administrator"}><FontAwesomeIcon icon={faStopCircle} className="mr-1"/>Stop</Button>
                </>}

              {workflowStatus === "paused" && 
                <>
                  <Button variant="outline-warning" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faPause} className="mr-1"/> Paused</Button>
                  <Button variant="warning" className="mr-1"  size="sm" onClick={() => { handleApprovalClick(); }}
                    disabled={role !== "administrator"}><FontAwesomeIcon icon={faFlag} className="mr-1" fixedWidth/>Approve Step</Button>
                </>}

              {(workflowStatus === "stopped" || !workflowStatus) && 
                <Button variant="success" className="mr-1" size="sm"
                  onClick={() => { handleRunPipelineClick(data._id); }}
                  disabled={role !== "administrator" || editWorkflow}>
                  <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/>Start Pipeline</Button>}
              
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Restart pipeline from beginning as new run" })} >
                <Button variant="outline-danger" className="mr-1"  size="sm" 
                  onClick={() => { handleStopWorkflowClick(data._id); }}
                  disabled={role !== "administrator" || editWorkflow}>
                  <FontAwesomeIcon icon={faHistory} fixedWidth className="mr-1"/>Reset Pipeline</Button>
              </OverlayTrigger>
              
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Refresh pipeline status" })} >
                <Button variant="secondary" className="mr-1" size="sm" onClick={() => { handleRefreshClick(data._id); }}>
                  <FontAwesomeIcon icon={faSync} fixedWidth/></Button>  
              </OverlayTrigger>
              
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View pipeline configuration" })} >
                <Button variant="secondary" className="mr-1" size="sm" onClick= {() => { handleViewPipelineClick(data); }} >
                  <FontAwesomeIcon icon={faFileAlt} fixedWidth/></Button>
              </OverlayTrigger>
                    
                       
              {editWorkflow ?
                <Button variant="success" size="sm" onClick= {() => { handleDoneWorkflowEditsClick(); }} >
                  {isSavingPipeline ? 
                    <FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/> :
                    <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/> }
                   Done</Button>                  
                :
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "Edit workflow" })} >                  
                  <Button variant="secondary" size="sm" onClick= {() => { handleEditWorkflowClick(); }} 
                    disabled={(workflowStatus && workflowStatus !== "stopped") || !previewRole || (userInfo && userInfo._id !== data.owner)} >
                    <FontAwesomeIcon icon={faPen} fixedWidth/> </Button>                  
                </OverlayTrigger>
              }                
                    
            </div>


            <div className="source workflow-module-container workflow-module-container-width-sm p-2">
              <div className="title-text-6 title-text-divider">Start of Workflow</div>
              {!data.workflow.source.service ? <div className="mt-1">Source Repository</div> : null }
              
              {data.workflow.source.name ?
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Project:</span> {data.workflow.source.name}</div>            
                </div> : null }
              {data.workflow.source.service ? 
                <div className="d-flex mt-1">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faCubes} size="sm" fixedWidth className="mr-1"/>Service: {data.workflow.source.service}</span>                    
                  </div>            
                </div> : null }

              {data.workflow.source.repository ? 
                <div className="d-flex">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faFileCode} size="sm" fixedWidth className="mr-1"/>Repository: {data.workflow.source.repository}</span>                    
                  </div>            
                </div> : null }
              {data.workflow.source.branch ? 
                <div className="d-flex">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faCodeBranch} size="sm" fixedWidth className="mr-1"/>Branch: {data.workflow.source.branch}</span>
                  </div>            
                </div> : null }

              <div className="d-flex">
                <div className="upper-case-first">
                  <span className="text-muted small">
                    <FontAwesomeIcon icon={faClipboardCheck} size="sm" fixedWidth className="mr-1"/>Webhook Trigger: {data.workflow.source.trigger_active ? "Enabled": "Disabled"}</span></div>
              </div>
                
              <div className="d-flex align-items-end flex-row mt-1">
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

                  {/* <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Source Activity Logs" })} >
                    <FontAwesomeIcon icon={faArchive}
                      className="text-muted mr-2" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewSourceActivityLog(data._id, data.workflow.source.service); }} />
                  </OverlayTrigger> */}

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Source Repository" })} >
                    <FontAwesomeIcon icon={faCog}
                      style={{ cursor: "pointer" }}
                      className="text-muted" fixedWidth
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
                editWorkflow={editWorkflow}
                pipelineId={data._id} 
                accessToken={accessToken}
                setStateItems={setState}
                fetchPlan={fetchPlan}
                parentCallbackEditItem={callbackFunctionEditItem} 
                quietSavePlan={quietSavePlan}
                parentHandleViewSourceActivityLog={handleViewSourceActivityLog} />             
            </div>
            <SteppedLineTo from="source" to="step-items" orientation="v" borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="top" />

            <div className="workflow-module-container workflow-module-container-width-sm pt-2 mb-4 text-center mx-auto h6">
            End of Workflow
            </div>
          </div>          
          
        </> : null }
      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
      {showApprovalModal && <ApprovalModal pipelineId={data._id} visible={showApprovalModal} setVisible={setShowApprovalModal} refreshActivity={handleApprovalActivity} />}
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button} handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}  />}
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

PipelineWorkflow.propTypes = {
  data: PropTypes.object,
  fetchPlan: PropTypes.func,
  role: PropTypes.string,
  editItemId: PropTypes.string
};




export default PipelineWorkflow;