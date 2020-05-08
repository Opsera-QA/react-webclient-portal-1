import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";
import ReactJson from "react-json-view";


function ModalActivityLogsDialog({ header, size, jsonData, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState("log");
  const [dataView, setDataView] = useState(jsonData);
  
  useEffect(() => {
    setShowModal(show);
    if (jsonData !== undefined) {
      setViewType(jsonData.action);      
      const new_obj = iterate(jsonData);      
      setDataView(new_obj);
    }    
  }, [jsonData, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility(false);
  };

  const iterate = (obj) => {
    Object.keys(obj).forEach(key => {
      if (key === "configuration") {
        obj[key] = { data: "hidden" };
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        iterate(obj[key]);
      }
    });
    return obj;
  };


  if (viewType === "console output") {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Console Output</Modal.Title>
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
            <ReactJson src={dataView} displayDataTypes={false} />               
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