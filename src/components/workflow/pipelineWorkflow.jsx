import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import { SteppedLineTo } from "react-lineto";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faFileAlt, faCog, faPen, faSpinner, faCheck, faClipboardCheck, faCodeBranch, faFileCode, faCubes } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modalActivityLogs";
import PipelineWorkflowItemList from "./pipelineWorkflowItemList";
import PipelineActionControls from "./piplineActionControls";
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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [infoModal, setInfoModal] = useState({ show:false, header: "", message: "", button: "OK" });
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

  
  const loadFormData = async (pipeline) => {
    if (pipeline.workflow !== undefined) {
      setState({ items: pipeline.workflow.plan });
      setLastStep(pipeline.workflow.last_step);
      
      if (pipeline !== undefined && pipeline.workflow.last_step !== undefined) {
        let status = pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;

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

  const fetchActivityLogs = () => {
    loadFormData(data);
  };


  return (
    <>      
      {error ? <ErrorDialog error={error} /> : null}
      {typeof(data.workflow) !== "undefined" && data.workflow.hasOwnProperty("source") ? 
        <>
          <div className="max-content-module-width-50" style={{ margin:"0", padding: "0" }}>     
            <PipelineActionControls pipeline={data} disabledActionState={false} role={role} fetchData={fetchPlan} fetchActivityLogs={fetchActivityLogs} setParentWorkflowStatus={setWorkflowStatus} /> 
          </div>
          <div className="mb-2 w-100 max-content-module-width-50">           
            <div className="title-text-5">{data.name}</div>               
          </div>

          { role === "user" &&<div className="mb-2 w-100 max-content-module-width-50">           
            <div className="info-text">Limited Access Role.  Your account is a standard user and as such can view the pipeline and run it, but not change settings or approve actions.</div>     
          </div> }

          { role === "viewer" &&<div className="mb-2 w-100 max-content-module-width-50">           
            <div className="info-text">Limited Access Role.  Your account is only able to view this pipeline.  You cannot perform any actions around it. </div>     
          </div> }

          { !role &&<div className="mb-2 w-100 max-content-module-width-50">           
            <div className="info-text">Role Access Warning.  Your account does not have any roles associated with this pipeline.  You are being temporarily granted Viewer permissions and will not be able to perform any actions on this pipeline.</div>     
          </div> }
          

          <div className="default-custom-tabs">
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
          </div>


          <div className="workflow-container pl-2 max-content-module-width-50">
            <div className="pr-1 my-2 text-right">
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View pipeline configuration" })} >
                <Button variant="secondary" className="mr-1" size="sm" onClick= {() => { handleViewPipelineClick(data); }} >
                  <FontAwesomeIcon icon={faFileAlt} fixedWidth/></Button>
              </OverlayTrigger> 
                    
              {role === "administrator" && <>
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
                      disabled={(workflowStatus && workflowStatus !== "stopped") || role !== "administrator"} >
                      <FontAwesomeIcon icon={faPen} fixedWidth/> </Button>                  
                  </OverlayTrigger>
                }  </> }              
                    
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
                  
                  {workflowStatus !== "running" ?
                    <>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({ message: "Configure Source Repository" })} >
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
                items={state.items} 
                lastStep={lastStep} 
                editWorkflow={editWorkflow}
                pipelineId={data._id} 
                accessToken={accessToken}
                setStateItems={setState}
                fetchPlan={fetchPlan} 
                role={role}
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
  data: PropTypes.object,
  fetchPlan: PropTypes.func,
  role: PropTypes.string,
  editItemId: PropTypes.string
};
export default PipelineWorkflow;