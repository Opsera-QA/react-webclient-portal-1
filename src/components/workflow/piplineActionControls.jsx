import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext"; 
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "../common/modal";
import ApprovalModal from "./approvalModal";
import PipelineStartWizard from "./pipelineStartWizard";
import PipelineHelpers from "./pipelineHelpers";
import PipelineActions from "./actions";
import socketIOClient from "socket.io-client";
import isEqual from "lodash.isequal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPlay, faSync, faSpinner, faStopCircle, faHistory, faPause, faFlag } from "@fortawesome/free-solid-svg-icons";

import "./workflows.css";

function PipelineActionControls({ pipeline, role, disabledActionState, fetchData, fetchActivityLogs, setParentWorkflowStatus }) {
  //const contextType = useContext(AuthContext);
  const { getAccessToken, featureFlagItemInProd } = useContext(AuthContext);

  const [workflowStatus, setWorkflowStatus] = useState(false);
  const [socketRunning, setSocketRunning] = useState(false);
  const [resetPipeline, setResetPipeline] = useState(false);
  const [startPipeline, setStartPipeline] = useState(false);
  const [stopPipeline, setStopPipeline] = useState(false);
  const [approval, setApproval] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [wizardModal, setWizardModal] = useState({ show:false, pipelineType: "", pipelineId: "", pipelineOrientation: "" });
  const [infoModal, setInfoModal] = useState({ show:false, header: "", message: "", button: "OK" });
  const [error, setErrors] = useState();
  const endPointUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;


  useEffect(() => {    
    loadData(pipeline);
    setParentWorkflowStatus(workflowStatus);
    analyzeWorkflowStatus(workflowStatus);
  }, [workflowStatus]);


  const analyzeWorkflowStatus = (workflowStatus) => {
    if (workflowStatus === "paused" || workflowStatus === "stopped") {
      fetchActivityLogs();
    }
  };

  const loadData = (pipeline) => {
    if (pipeline.workflow !== undefined) {
      if (pipeline.workflow.last_step !== undefined) {
        let status = pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;                 
        if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
          setWorkflowStatus("paused");          
        } else {
          setWorkflowStatus(status);
        }
        if (status === "running" && !socketRunning) {
          subscribeToTimer();
        }        
      } else {
        setWorkflowStatus("stopped");                
      }                    
    }
  };



  // button handlers
  const handleStopWorkflowClick = async (pipelineId) => {
    setResetPipeline(true);
    setWorkflowStatus("stopped");
    await cancelPipelineRun(pipelineId);    
    await fetchData();
    fetchActivityLogs();      
    setResetPipeline(false);
  };

  const handleApprovalClick = () => {
    setApproval(true);
    stopSocket();
    setShowApprovalModal(true);        
  };

  const handleApprovalActivity = async () => {
    setInfoModal({ show:true, header: "Approval Status", message: "Your approval action has been recorded in this pipeline's Activity Logs.  The pipeline will resume operations shortly.", button: "OK" });
    setWorkflowStatus("running");  
    await fetchData();
    subscribeToTimer();  
    setApproval(false);  
  };




  const launchPipelineStartWizard = (pipelineOrientation, pipelineType, pipelineId) => {
    console.log("launching wizard");
    console.log("pipelineOrientation ", pipelineOrientation);
    console.log("pipelineType ", pipelineType);
    console.log("pipelineId ", pipelineId);
    setWizardModal({ show:true, pipelineType: pipelineType, pipelineId: pipelineId, pipelineOrientation: pipelineOrientation });
  };

  const handlePipelineStartWizardClose = () => {
    console.log("closing wizard");
    setWizardModal({ show:false, pipelineType: "", pipelineId: "", pipelineOrientation: "" });
  };

  const handlePipelineWizardRequest = async (pipelineId, restartBln) => {
    setWizardModal({ ...wizardModal, show: false });
    if (restartBln) {
      console.log("clearing pipeline activity and then starting over");
      await cancelPipelineRun(pipelineId);
    }
    console.log("starting piepline", pipelineId);
    await runPipeline(pipelineId);    
  }; 

  //TODO: WARNING FEATURE FLAG IN USE HERE!
  const handleRunPipelineClick = async (pipelineId) => {
    //check type of pipeline to determine if pre-flight wizard is required
    // is pipeline at the beginning or stopped midway or end of prior?
    const pipelineType = typeof pipeline.type !== "undefined" && pipeline.type[0] !== undefined ? pipeline.type[0] : ""; //for now type is just the first entry
    console.log("pipelineType: ", pipelineType);
    
    let pipelineOrientation = "start";
    //what step are we currently on in the pipeline: first, last or middle?
    if (pipeline.workflow.last_step && pipeline.workflow.last_step.step_id) {
      const stepIndex = PipelineHelpers.getStepIndex(pipeline, pipeline.workflow.last_step.step_id);
      console.log("current resting step index: ", stepIndex);
      if (stepIndex+1 === Object.keys(pipeline.workflow.plan).length) {
        pipelineOrientation = "end";
      } else {
        pipelineOrientation = "middle";
      }
    } //if those steps don't exist, this is the start of the pipeline
    console.log("pipelineOrientation: ", pipelineOrientation); //where is the pipeline in it's run to determine how to handle this start command

    // introduce new modal.  If button is clicked and pipeline is NOT SFDC type and is at "start" orientation, then just run the code, 
    // if pipeline orgientation is end and type is NOT SFDC, then trigger reset pipeline to clean out ata and then just run the code
    // otherwise, trigger new modal wizard to have user confirm if they want to resume pipeline or start over, OR if SFDC, launch new wizard

    if (pipelineType === "sfdc") { 
      console.log("SFDC pipeline detected, launching wizrd");
      launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);
    } else {
      console.log(`Non SFDC Pipeline detected, current pipeline orientation: ${pipelineOrientation}`);
      
      if (pipelineOrientation === "middle" && !featureFlagItemInProd()) {
        //this is the middle, so pop the new modal to confirm user wants to resume or offer reset/restart
        launchPipelineStartWizard(pipelineOrientation, pipelineType, pipelineId);

      } else { //this is starting from beginning:
        setStartPipeline(true);
        setWorkflowStatus("running");

        if (pipelineOrientation === "start") {
          console.log("starting pipeline from scratch");
          await runPipeline(pipelineId);
        } else {
          console.log("clearing pipeline activity and then starting over");
          await cancelPipelineRun(pipelineId);
          await runPipeline(pipelineId);
        } 
      }      
    }
  };



  const handleRefreshClick = async () => {
    await fetchData();
    fetchActivityLogs();
    setTimeout(subscribeToTimer(), 5000); 
  };
  
  //action functions
  async function cancelPipelineRun(pipelineId) {
    setStopPipeline(true);
    //const { getAccessToken } = contextType;
    const response = await PipelineActions.cancel(pipelineId, getAccessToken);
    if (typeof(response.error) !== "undefined") {
      console.log(response.error);
      setErrors(response.error);
    }   
    setStopPipeline(false);
  }

  async function runPipeline(pipelineId) {
    //const { getAccessToken } = contextType;
    console.log("RUNNING PIPELINE; ", pipelineId);
    
    const response = await PipelineActions.run(pipelineId, {}, getAccessToken);
    
    if (typeof(response.error) !== "undefined") {
      setWorkflowStatus("stopped");
      console.log(response.error);
      setErrors(response.error);
      setStartPipeline(false);
    } else {    
      setTimeout(function () {
        subscribeToTimer();
      }, 5000);      

      setTimeout(function () {
        setStartPipeline(false);
      }, 20000);

    }  
  }


  let tmpDataObject = {};
  let staleRefreshCount = 0;
  let socket;
  
  const initializeSocket = () => {    
    socket = socketIOClient(endPointUrl, { query: "pipelineId=" + pipeline._id });
    console.log("Connected status before onConnect", socket.socket ? socket.socket.connected : socket.socket === undefined );
    setSocketRunning(true);      
  };

  const stopSocket = () => {   
    if (socket) {
      socket.close();
      console.log("closing connection manually");
      setSocketRunning(false);
    }     
  };

  const subscribeToTimer = () => {       
    if (!socketRunning) {
      initializeSocket();
    }
    
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
        let status =  pipeline.workflow.last_step !== undefined && pipeline.workflow.last_step.hasOwnProperty("status") ? pipeline.workflow.last_step.status : false;
        if (staleRefreshCount % 2 === 0) {
          //console.log("divisible by 2 refresh");
          fetchActivityLogs();
        }

        if (staleRefreshCount >= 20) {
          console.log("closing connection due to stale data");
          setWorkflowStatus("stopped");
          setSocketRunning(false);
          socket.close();
          fetchActivityLogs();
        } else {          
          if (status === "stopped" && pipeline.workflow.last_step.running && pipeline.workflow.last_step.running.paused) {
            setWorkflowStatus("paused");          
          } else {
            setWorkflowStatus(status);
          }
        }
           
        if (typeof(dataObj) !== "undefined" && Object.keys(dataObj).length > 0) {
          pipeline.workflow.last_step = dataObj;          
        }

        if (staleRefreshCount > 1 && status === "stopped") {
          console.log("closing connection due to stopped status");
          setWorkflowStatus("stopped");
          setSocketRunning(false);
          socket.close();
          fetchActivityLogs();
        }
      });
    }

    socket.on("disconnect", () => {
      setWorkflowStatus("stopped");
      setSocketRunning(false);
    });

    socket.on("connect_error", function(err) {
      console.log("Connection Error on Socket:", err);
      setWorkflowStatus("stopped");
      setSocketRunning(false);
      socket.close();
    });
  };

  


  return (
    <>
      {wizardModal.show && <PipelineStartWizard pipelineType={wizardModal.pipelineType} pipelineOrientation={wizardModal.pipelineOrientation} pipelineId={wizardModal.pipelineId} pipelineSteps={pipeline.workflow.plan} handleClose={handlePipelineStartWizardClose} handlePipelineWizardRequest={handlePipelineWizardRequest} />}
      
      <div className="text-right" style={{ marginBottom: "5px" }}>
        {workflowStatus === "running" && 
        <>
          <Button variant="outline-dark" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> Running</Button>
          <Button variant="outline-danger" className="mr-1"  size="sm" onClick={() => { handleStopWorkflowClick(pipeline._id); }}
            disabled={role !== "administrator" && role !== "user"}>
            {stopPipeline ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1"/> : <FontAwesomeIcon icon={faStopCircle} className="mr-1"/>}Stop</Button>
        </>}

        {workflowStatus === "paused" && 
        <>
          <Button variant="outline-warning" className="mr-1"  size="sm" disabled><FontAwesomeIcon icon={faPause} className="mr-1"/> Paused</Button>
          <Button variant="warning" className="mr-1"  size="sm" onClick={() => { handleApprovalClick(); }}
            disabled={role !== "administrator"}>
            {approval ? <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> : <FontAwesomeIcon icon={faFlag} className="mr-1" fixedWidth/>}Approve Step</Button>
        </>}

        {(workflowStatus === "stopped" || !workflowStatus) && 
        <>
          <Button variant="success" className="mr-1" size="sm"
            onClick={() => { handleRunPipelineClick(pipeline._id); }}
            disabled={role !== "administrator" && role !== "user" || disabledActionState}>
            { startPipeline ? <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1"/> : <FontAwesomeIcon icon={faPlay} fixedWidth className="mr-1"/> }Start Pipeline</Button>
        </>}
        
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "Restart pipeline from beginning as new run" })} >
          <Button variant="outline-danger" className="mr-1"  size="sm" 
            onClick={() => { handleStopWorkflowClick(pipeline._id); }}
            disabled={role !== "administrator" && role !== "user" || disabledActionState}>
            {resetPipeline ? <FontAwesomeIcon icon={faSpinner} fixedWidth spin className="mr-1"/> : <FontAwesomeIcon icon={faHistory} fixedWidth className="mr-1"/>}
            Reset Pipeline</Button>
        </OverlayTrigger>
              
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip({ message: "Refresh pipeline status" })} >
          <Button variant="secondary" className="mr-1" size="sm" onClick={() => { handleRefreshClick(); }}>
            <FontAwesomeIcon icon={faSync} fixedWidth/></Button>  
        </OverlayTrigger>
              
      </div>
      {showApprovalModal && <ApprovalModal pipelineId={pipeline._id} visible={showApprovalModal} setVisible={setShowApprovalModal} refreshActivity={handleApprovalActivity} />}
      {infoModal.show && <Modal header={infoModal.header} message={infoModal.message} button={infoModal.button} handleCancelModal={() => setInfoModal({ ...infoModal, show: false })}  />}
    </>);
}


function renderTooltip(props) {
  const { message } = props;
  return (
    <Tooltip id="button-tooltip" {...props}>
      {message}
    </Tooltip>
  );
}

PipelineActionControls.propTypes = {
  pipeline: PropTypes.object,
  role: PropTypes.string,
  disabledActionState: PropTypes.bool,
  fetchData: PropTypes.func,
  fetchActivityLogs: PropTypes.func,
  setParentWorkflowStatus: PropTypes.func
};
export default PipelineActionControls;