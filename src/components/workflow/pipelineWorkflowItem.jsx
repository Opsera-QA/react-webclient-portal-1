import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faArchive, faBookmark, faSpinner, faCheckCircle, faEnvelope, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import ModalActivityLogs from "../common/modalActivityLogs";
import Moment from "react-moment";
import "./workflows.css";


const PipelineWorkflowItem = ({ item, index, lastStep, nextStep, pipelineId, parentCallback, parentHandleViewSourceActivityLog }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [modalHeader, setModalHeader] = useState("");
  const [currentStatus, setCurrentStatus] = useState({});
  const [itemState, setItemState] = useState(false);

  useEffect(() => {    
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
  }, [lastStep]);

  const handleViewClick = (data, header) => {
    setModalMessage(data);
    setModalHeader(header);
    setShowModal(true);
  };

  const handleEditClick = (type, name, itemId) => {
    parentCallback({ type: type, tool_name: name, step_id: itemId });
  };  

  return (
    <>
      <div>
        <Row>
          <Col><span className="text-muted">Step:</span> {item.name}</Col>
          <Col className="text-right" style={{ fontSize:"small" }}>
            { currentStatus.status === "failed" || currentStatus.status === "failure" ? 
              <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip({ message: "View Errors" })} >
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2 red" 
                  style={{ cursor: "pointer" }} size="lg"
                  onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
              </OverlayTrigger> :
              <>
                {itemState === "completed" ? 
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip({ message: "View Log" })} >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2 green" 
                      style={{ cursor: "pointer" }}  size="lg"
                      onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
                  </OverlayTrigger> : null }
                {itemState === "running" ?  <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip({ message: "View Log" })} >
                  <FontAwesomeIcon icon={faSpinner} className="mr-2 green" 
                    style={{ cursor: "pointer" }}  size="lg" spin
                    onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id, currentStatus.activity_id); }} />
                </OverlayTrigger> : null }  

                {nextStep !== undefined && nextStep._id === item._id && itemState !== "running" ? 
                  <FontAwesomeIcon icon={faBookmark} className="nav-blue mr-2" /> : null }
              </> }                  
          </Col>
        </Row>
        <Row>
          <Col className="upper-case-first"><span className="text-muted">Tool:</span> {item.tool.tool_identifier}</Col>
        </Row>
         
        { typeof(currentStatus) !== "undefined" && currentStatus.step_id === item._id ? 
          <>
            <Row>
              <Col><span className="text-muted pr-1">Status:</span> 
                <span className="upper-case-first pr-1">{currentStatus.status}</span>
                   on <Moment format="YYYY-MM-DD, hh:mm a" date={currentStatus.updatedAt} />                                   
              </Col>
            </Row>
             
          </> : null}
        <Row className="mt-1">
          <Col className="text-muted small">ID: {item._id}</Col>
          <Col className="text-right pt-1 workflow-action-icons">
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
                onClick={() => { handleEditClick("notification", item.tool.tool_identifier, item._id); }} />
            </OverlayTrigger>

            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip({ message: "Configure Step Settings" })} >
              <FontAwesomeIcon icon={faCog}
                style={{ cursor: "pointer" }}
                className="text-muted mx-1" fixedWidth
                onClick={() => { handleEditClick("tool", item.tool.tool_identifier, item._id); }} />
            </OverlayTrigger>
          </Col>
        </Row>
     
      </div>

      <ModalActivityLogs header={modalHeader} size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
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
  parentCallback: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func,
  parentHandleViewSourceActivityLog: PropTypes.func
};

export default PipelineWorkflowItem;