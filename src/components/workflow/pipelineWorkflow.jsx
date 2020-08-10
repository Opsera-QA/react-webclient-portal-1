import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import { SteppedLineTo } from "react-lineto";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faFileAlt, faCog, faPen, faSpinner, faCheck, faClipboardCheck, faCode, faFileCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modal/modalActivityLogs";
import PipelineWorkflowItemList from "./pipelineWorkflowItemList";
import PipelineActionControls from "./piplineActionControls";
import Modal from "../common/modal/modal";
import "./workflows.css";

const PipelineWorkflow = (props) => {
  const { pipeline, fetchPlan, customerAccessRules, editItemId } = props;
  const [error, setErrors] = useState();
  const [userInfo, setUserInfo] = useState();
  const [modalHeader, setModalHeader] = useState("");
  const contextType = useContext(AuthContext);
  const [state, setState] = useState({ items: [] });
  const [lastStep, setLastStep] = useState({});  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [infoModal, setInfoModal] = useState({ show:false, header: "", message: "", button: "OK" });
  const [isSavingPipeline, setIsSavingPipeline] = useState(false);


  const authorizedAction = (action, owner) => {
    if (customerAccessRules.Administrator) {
      return true; //all actions are authorized to administrrator
    } else if (owner && customerAccessRules.UserId === owner) {
      return true; //owner can do all actions
    } else if (customerAccessRules.PowerUser) {
      return false;
    } else if (customerAccessRules.User) {
      return false;
    } else {
      return false;
    }
  };

    useEffect(() => {
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await checkAuthentication();
        await loadFormData(pipeline);
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
  }, [pipeline, editItemId]);

  
  const loadFormData = async (pipeline) => {
    if (pipeline.workflow !== undefined) {
      setState({ items: pipeline.workflow.plan });
      setLastStep(pipeline.workflow.last_step);
      
      if (pipeline.workflow.last_step !== undefined) {
        let status = Object.prototype.hasOwnProperty.call(pipeline.workflow.last_step, "status") ? pipeline.workflow.last_step.status : false;

        if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
          setWorkflowStatus("paused");
        } else {
          setWorkflowStatus(status);
        }          
      } else {
        setWorkflowStatus(false);        
      }      
    }
  };

  async function checkAuthentication ()  {
    const { getUserRecord, getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    setAccessToken(accessToken);
    try {
      const userInfoResponse = await getUserRecord();      
      if (userInfoResponse !== undefined && Object.keys(userInfoResponse).length > 0) {
        setUserInfo(userInfoResponse);            
      }
    }
    catch (err) {
      console.log("Error occurred getting user authentication status.", err);
    }    
  }
 

  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };
  
  const fetchPipelineActivityByTool = async (pipelineId, tool, stepId, activityId) => {
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
  };

  const handleViewPipelineClick = (param) => {
    setModalHeader("Pipeline Configuration");
    setModalMessage(param);
    setShowModal(true);
  };

  const callbackFunctionEditItem = (item) => {
    window.scrollTo(0, 0);    
    setEditWorkflow(false);
    item.id = pipeline._id;
    fetchPlan(item);
  };

  async function updatePipeline(pipeline) {
    const apiUrl = `/pipelines/${pipeline._id}/update`;
    try {
      await axiosApiService(accessToken).post(apiUrl, pipeline);
    }
    catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  const handleSourceEditClick = () => {
    fetchPlan({ id: pipeline._id, type: "source", item_id: "" });
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
    console.log("saving plan: ", pipeline.workflow.plan);
    await updatePipeline(pipeline);
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

  const fetchActivityLogs = () => {
    loadFormData(pipeline);
  };


  return (
    <>      
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(pipeline.workflow) !== "undefined" && pipeline.workflow.hasOwnProperty("source") ?
        <>
          <div className="max-content-module-width-50" style={{ margin:"0", padding: "0" }}>     
            <PipelineActionControls pipeline={pipeline} disabledActionState={false} customerAccessRules={customerAccessRules} fetchData={fetchPlan} fetchActivityLogs={fetchActivityLogs} setParentWorkflowStatus={setWorkflowStatus} />
          </div>

          {pipeline.owner !== customerAccessRules.UserId &&
          <>
            <div className="mb-2 w-100 max-charting-width info-text">
              {customerAccessRules.Role === "administrator" && <>Administrator Access Role: Your account has full
                access to this pipeline and its settings.</>}
              {customerAccessRules.Role === "power_user" && <>Power User Role: Your account has elevated privileges to
                this pipeline which include changing settings and running the pipeline.</>}
              {customerAccessRules.Role === "user" && <>Standard User Role: Your account has basic access to this
                pipeline which is limited to viewing and running pipeline operations only.</>}
              {customerAccessRules.Role === "readonly" && <>Read Only Role: Your account does not have any privileges
                associated with this pipeline. You are being temporarily granted Viewer permissions and will not be able to perform any
                actions.</>}
            </div>
          </>
          }

          <div className="mb-2 w-100 max-content-module-width-50">           
            <div className="title-text-5">{pipeline.name}</div>
          </div>

          <div className="default-custom-tabs">
            <ul className="nav nav-tabs w-100" style={{ borderBottom: "none" }}>
              <li className="nav-item">
                <Link className="nav-link" 
                  to={location => `/workflow/${pipeline._id}`}>Summary</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" 
                  to={location => `/workflow/${pipeline._id}/model`}>Workflow</Link>
              </li>
            </ul>
          </div>


          <div className="workflow-container pl-2 max-content-module-width-50">
            <div className="pr-1 my-2 text-right float-right">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View pipeline configuration" })} >
                <Button variant="secondary" className="mr-1" size="sm" onClick= {() => { handleViewPipelineClick(pipeline); }} >
                  <FontAwesomeIcon icon={faFileAlt} fixedWidth/></Button>
              </OverlayTrigger> 
                    
              {authorizedAction("edit_workflow_btn", pipeline.owner) && <>
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
                      disabled={(workflowStatus && workflowStatus !== "stopped") || !authorizedAction("edit_workflow_btn", pipeline.owner)} >
                      <FontAwesomeIcon icon={faPen} fixedWidth/> </Button>                  
                  </OverlayTrigger>
                }  </> }              
                    
            </div>


            <div className="source workflow-module-container workflow-module-container-width-sm p-2 mt-2">
              <div className="title-text-6">Start of Workflow</div>
              {/*{!pipeline.workflow.source.service ? <div className="mt-1">Source Repository</div> : null }
              
              {pipeline.workflow.source.name ?
                <div className="d-flex">
                  <div className="p-1 upper-case-first"><span className="text-muted">Project:</span> {pipeline.workflow.source.name}</div>
                </div> : null }
              {pipeline.workflow.source.service ?
                <div className="d-flex mt-1">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faCubes} size="sm" fixedWidth className="mr-1"/>Service: {pipeline.workflow.source.service}</span>
                  </div>            
                </div> : null }

              {pipeline.workflow.source.repository ?
                <div className="d-flex">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faFileCode} size="sm" fixedWidth className="mr-1"/>Repository: {pipeline.workflow.source.repository}</span>
                  </div>            
                </div> : null }
              {pipeline.workflow.source.branch ?
                <div className="d-flex">
                  <div className="upper-case-first">
                    <span className="text-muted small">
                      <FontAwesomeIcon icon={faCodeBranch} size="sm" fixedWidth className="mr-1"/>Branch: {pipeline.workflow.source.branch}</span>
                  </div>            
                </div> : null }*/}

              {pipeline.workflow.source.trigger_active &&
              <div className="d-flex">
                <div className="upper-case-first">
                  <span className="text-muted small">
                    <FontAwesomeIcon icon={faClipboardCheck} size="sm" fixedWidth className="mr-1"/>Webhook Trigger: {pipeline.workflow.source.trigger_active ? "Enabled": "Disabled"}</span></div>
              </div> }

              {pipeline.workflow.source.service &&
              <div className="d-flex">
                <div className="upper-case-first">
                  <span className="text-muted small">
                    <FontAwesomeIcon icon={faCode} size="sm" fixedWidth className="mr-1"/>Source Repository: {pipeline.workflow.source.service }</span></div>
              </div> }
                
              <div className="d-flex align-items-end flex-row mt-1">
                <div className="ml-auto text-right">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Settings" })} >
                    <FontAwesomeIcon icon={faSearchPlus}
                      className="text-muted mr-2" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewClick(pipeline.workflow.source, "Step Settings"); }} />
                  </OverlayTrigger>
                  
                  {workflowStatus !== "running" ?
                    <>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({ message: "Configure Pipeline Level Settings" })} >
                        <FontAwesomeIcon icon={faCog}
                          style={{ cursor: "pointer" }}
                          className="text-muted" fixedWidth
                          onClick={() => { handleSourceEditClick(); }} />  
                      </OverlayTrigger>                       
                    </>
                    :
                    <>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({ message: "Cannot access settings while pipeline is running" })} >
                        <FontAwesomeIcon icon={faCog}
                          className="text-muted mx-1" fixedWidth  />
                      </OverlayTrigger>
                    </>
                  }
                </div>
              </div>
            </div>

            <div style={{ height: "40px" }}>&nbsp;</div>

            <div className="step-items workflow-module-container-width mx-auto">
              <PipelineWorkflowItemList
                pipeline={pipeline}
                items={state.items} 
                lastStep={lastStep} 
                editWorkflow={editWorkflow}
                pipelineId={pipeline._id}
                accessToken={accessToken}
                setStateItems={setState}
                fetchPlan={fetchPlan}
                customerAccessRules={customerAccessRules}
                parentCallbackEditItem={callbackFunctionEditItem} 
                quietSavePlan={quietSavePlan}
                parentHandleViewSourceActivityLog={handleViewSourceActivityLog}
                parentWorkflowStatus={workflowStatus} />             
            </div>
            <SteppedLineTo from="source" to="step-items" orientation="v" borderColor="#0f3e84" borderWidth={2} fromAnchor="bottom" toAnchor="top" />

            <div className="workflow-module-container workflow-module-container-width-sm pt-2 mb-4 text-center mx-auto h6">
            End of Workflow
            </div>
          </div>          
          
        </> : null }
      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button} handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}  />}
    </>
  );
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
  pipeline: PropTypes.object,
  fetchPlan: PropTypes.func,
  customerAccessRules: PropTypes.object,
  editItemId: PropTypes.string
};
export default PipelineWorkflow;