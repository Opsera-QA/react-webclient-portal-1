import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { axiosApiService } from "../../api/apiService";
import { AuthContext } from "../../contexts/AuthContext"; 
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../common/error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus, faCog, faArchive, faCircleNotch, faChevronDown, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Draggable } from "react-beautiful-dnd";
import Modal from "../common/modal";
import Moment from "react-moment";
import "./workflows.css";

const grid = 8;
const QuoteItem = styled.div`
max-width: 450px;
background-color: #fff;
color: #334152;
border: 1px solid rgba(0,0,0,.125);
border-radius: .25rem;
margin-bottom: ${grid}px;
padding: ${grid}px;
`;

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

  const setStepStatusStyle = (last_step, item_id) => {
    let success = "#28a74533"; //green
    let running = "#ffc1077a"; //yellow
    let failed = "#dc354552"; //red
    let inactive = "#fff"; //white

    //is this step in either the last_step.succcess, failed or running object?
    if (typeof(last_step) !== "undefined") {
      if(typeof(last_step.success) !== "undefined" && last_step.success.step_id === item_id) {
        return success;
      }
      else if(typeof(last_step.running) !== "undefined" && last_step.running.step_id === item_id) {
        return running;
      }
      else if(typeof(last_step.failed) !== "undefined" && last_step.failed.step_id === item_id) {
        return failed;
      } else {
        return inactive;
      }
    }

  }; 

  const ItemStyle = {
    backgroundColor: setStepStatusStyle(lastStep, item._id) 
  };

  return (
    <>
      <Draggable draggableId={item._id} index={index} > 
        {provided => (
          <QuoteItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={ItemStyle}
          >
          
            <Row>
              <Col><span className="text-muted">Step:</span> {item.name}</Col>
              <Col className="text-right" style={{ fontSize:"small" }}>
                {itemState === "completed" ? <FontAwesomeIcon icon={faCheck} className="text-muted mr-2" /> : null }
                {itemState === "running" ? <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-2" /> : null }                  
                {nextStep !== undefined && nextStep._id === item._id ? <FontAwesomeIcon icon={faCircleNotch} className="text-muted mr-2" /> : null }                  
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
              <Col className="text-right pt-1">
                <FontAwesomeIcon icon={faSearchPlus} //settings!
                  className="text-muted mr-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { handleViewClick(item, "Step Settings"); }} />

                <FontAwesomeIcon icon={faArchive}
                  className="text-muted mr-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => { parentHandleViewSourceActivityLog(pipelineId, item.tool.tool_identifier, item._id); }} />

                <FontAwesomeIcon icon={faCog}
                  style={{ cursor: "pointer" }}
                  className="text-muted mr-2"
                  onClick={() => { handleEditClick("tool", item.tool.tool_identifier, item._id); }} />
               
              </Col>
            </Row>
          
          
          </QuoteItem>
        )}
      </Draggable>
    

      <div className="text-center py-1">
        <FontAwesomeIcon icon={faChevronDown} size="lg" className="nav-blue"/>            
      </div>

      {showModal ? <Modal header={modalHeader}
        jsonMessage={modalMessage}
        jsonView="true"
        button="OK"
        size="lg"
        handleCancelModal={() => setShowModal(false)}
        handleConfirmModal={() => setShowModal(false)} /> : null}
    </>
  );
};


PipelineWorkflowItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  lastStep: PropTypes.object,
  nextStep: PropTypes.object,
  pipelineId: PropTypes.string,
  parentCallback: PropTypes.func,
  handleViewSourceActivityLog: PropTypes.func
};

export default PipelineWorkflowItem;