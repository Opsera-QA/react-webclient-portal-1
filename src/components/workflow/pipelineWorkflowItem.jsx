import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Modal from "../common/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faArchive, faBookmark, faSpinner, faCheckCircle, faEnvelope, faExclamationTriangle, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modalActivityLogs";
import { format } from "date-fns";
import "./workflows.css";


const PipelineWorkflowItem = ({ item, index, lastStep, nextStep, pipelineId, editWorkflow, parentCallbackEditItem, deleteStep, parentHandleViewSourceActivityLog }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [modalHeader, setModalHeader] = useState("");
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState(false);
  const [stepConfigured, setStepConfigured] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalDeleteIndex, setModalDeleteIndex] = useState(false);
  
  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(item, lastStep);                
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
  }, [item, lastStep]);

  const loadFormData = async (item, lastStep) => {
    if (typeof(lastStep) !== "undefined" && typeof(item) !== "undefined") {
      if(typeof(lastStep.success) !== "undefined" && lastStep.success.step_id === item._id) {
        setCurrentStatus(lastStep.success);
        setItemState("completed");
      }
      else if(typeof(lastStep.running) !== "undefined" && lastStep.running.step_id === item._id) {
        setCurrentStatus(lastStep.running);
        setItemState("running");
      }
      else if(typeof(lastStep.failed) !== "undefined" && lastStep.failed.step_id === item._id) {
        setCurrentStatus(lastStep.failed);
        setItemState("failed");
      } else {
        setCurrentStatus({});
        setItemState("");
      }
    } else {
      setCurrentStatus({});
      setItemState("");
    }    

    if (item !== undefined) {
      if (item.tool !== undefined && (typeof(item.tool.tool_identifier) === "string" && item.tool.tool_identifier.length > 0) && (item.type !== undefined && Object.keys(item.type[0]).length > 0)) {
        setStepConfigured(true);
      } else {
        setStepConfigured(false);
      }
    } else {
      setStepConfigured(false);
    }    
  };

  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };

  const handleEditClick = (type, tool, itemId) => {
    if (tool && tool.tool_identifier !== undefined) {
      parentCallbackEditItem({ type: type, tool_name: tool.tool_identifier, step_id: itemId });    
    } else {
      parentCallbackEditItem({ type: type, tool_name: "", step_id: itemId });    
    }
  };  

  const handleDeleteStepClick = (index) => {
    setShowDeleteModal(true);    
    setModalDeleteIndex(index);    
  };

  const handleDeleteStepClickConfirm = (index) => {    
    setShowDeleteModal(false);    
    deleteStep(index);
  };


  return (
    <>
      <div>
        <div className="title-text-6 upper-case-first ml-1 mt-1 title-text-divider">{item.type[0] ? item.type[0] : "Pipeline Step"}        
          <div className="float-right text-right">
            {stepConfigured === true && editWorkflow === false ? 
              <>
                { currentStatus.status === "failed" || currentStatus.status === "failure" ? 
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Errors" })} >
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 red" 
                      style={{ cursor: "pointer" }} 
                      onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
                  </OverlayTrigger> :
                  <>
                    {itemState === "completed" ? 
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip({ message: "View Log" })} >
                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2 green" 
                          style={{ cursor: "pointer" }} 
                          onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
                      </OverlayTrigger> : null }
                    {itemState === "running" ?  <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip({ message: "View Log" })} >
                      <FontAwesomeIcon icon={faSpinner} className="mr-2 green" 
                        style={{ cursor: "pointer" }} spin
                        onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
                    </OverlayTrigger> : null }  

                    {nextStep !== undefined && nextStep._id === item._id && itemState !== "running" ? 
                      <FontAwesomeIcon icon={faBookmark} className="nav-blue mr-2" /> : null }
                  </> }                  
              </> : 
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Step Setup" })} >
                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mx-1" fixedWidth
                  onClick={() => { handleEditClick("step", item.tool, item._id); }} />
              </OverlayTrigger>              
            }

            {editWorkflow ? <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "Delete Step" })} >
                <FontAwesomeIcon icon={faTrash} className="mr-2 ml-1 dark-grey" 
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleDeleteStepClick(index); }} />
              </OverlayTrigger>
            </> : null }
          </div>
        </div>
        
        <div className="d-flex flex-row mb-1 mt-1">
          <div className="pl-1 workflow-module-text-flex-basis text-muted">Name:</div>
          <div className="pl-1">{item.name}</div>
          <div className="flex-grow-1"></div>                  
        </div>

        <div className="d-flex flex-row mb-1">
          <div className="pl-1 workflow-module-text-flex-basis text-muted">Tool:</div>
          <div className="pl-1 upper-case-first">{item.tool !== undefined ? item.tool.tool_identifier : ""}</div>
          <div className="flex-grow-1"></div>
        </div>

        { item.last_status && Object.keys(item.last_status).length > 0 && typeof(item.last_status.data) === "object" ? 
          <div>
            <div className="pl-1 text-muted small">Last status update on {format(new Date(item.last_status.updatedAt), "hh:mm a 'on' MMM dd yyyy'")}:</div>
            <div className="pt-1 pl-1 code json-block-text small">
              {Object.keys(item.last_status.data).map(key => {
                if (typeof(item.last_status.data[key]) === "string" || typeof(item.last_status.data[key]) === "number") {
                  return <div key={key}className="json-block-text small ml-1" style={{ padding:0, margin:0 }}>{key}: {item.last_status.data[key]}</div>;
                }                
              })}              
            </div>            
          </div> : null}


        {/* <div className="d-flex flex-row mb-1">
          <div className="p-1"></div>
        </div>
 */}
        {stepConfigured === true ? 
          <div className="d-flex align-items-end flex-row">
            <div className="p-1"><span className="text-muted small">Step: {item._id}</span></div>
            <div className="p-2"></div>
            <div className="flex-grow-1 p-1 text-right">
              {!editWorkflow ? 
                <>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Settings" })} >
                    <FontAwesomeIcon icon={faSearchPlus} //settings!
                      className="text-muted mx-1" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { handleViewClick(item, "Step Settings"); }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Step Activity Logs" })} >
                    <FontAwesomeIcon icon={faArchive}
                      className="text-muted mx-1" fixedWidth
                      style={{ cursor: "pointer" }}
                      onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id); }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Step Notification and Approval Rules" })} >
                    <FontAwesomeIcon icon={faEnvelope}
                      style={{ cursor: "pointer" }}
                      className="text-muted mx-1" fixedWidth
                      onClick={() => { handleEditClick("notification", item.tool, item._id); }} />
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "Configure Step Settings" })} >
                    <FontAwesomeIcon icon={faCog}
                      style={{ cursor: "pointer" }}
                      className="text-muted mx-1" fixedWidth
                      onClick={() => { handleEditClick("tool", item.tool, item._id); }} />
                  </OverlayTrigger>
                </> : null }
            </div>
          </div> : null }

      </div>

      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />

      {showDeleteModal ? <Modal header="Confirm Pipeline Step Delete"
        message="Warning! Data about this step cannot be recovered once it is deleted. Do you still want to proceed?"
        button="Confirm"
        handleCancelModal={() => setShowDeleteModal(false)}
        handleConfirmModal={() => handleDeleteStepClickConfirm(modalDeleteIndex)} /> : null}
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

PipelineWorkflowItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  editWorkflow: PropTypes.bool,
  parentCallbackEditItem: PropTypes.func,
  parentCallbackDeleteStep: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func
};

export default PipelineWorkflowItem;