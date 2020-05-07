import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";
import ReactJson from "react-json-view";


function ModalActivityLogsDialog({ header, size, jsonData, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState("log");
  
  useEffect(() => {
    console.log("show: ", show);
    console.log("DATA", jsonData);
    setShowModal(show);
    if (jsonData !== undefined) {
      setViewType(jsonData.action);
    }    
  }, [jsonData, show]);



  const handleClose = () => {
    console.log("CLOSING!");
    setShowModal(false);
    setParentVisibility(false);
  };


  if (viewType === "console output") {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Console Ouptut</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="my-2">
              <div className="float-right"><Moment format="YYYY-MM-DD, hh:mm a" date={jsonData.createdAt} /></div> {jsonData.step_name} for &nbsp;
              <span className="upper-case-first">{jsonData.step_configuration ? jsonData.step_configuration.tool_identifier : null }</span></div>
            <div className="console-text m-3">
              {jsonData.api_response}
            </div>            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactJson src={jsonData} displayDataTypes={false} />               
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
     
      </>
    ); 
  }
}

  
ModalActivityLogsDialog.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,  
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func
};

export default ModalActivityLogsDialog;