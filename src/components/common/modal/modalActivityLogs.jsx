import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { format } from "date-fns";
import ReactJson from "react-json-view";

function ModalActivityLogsDialog({ header, size, jsonData, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [viewType, setViewType] = useState("log");
  const [dataView, setDataView] = useState(jsonData);
  
  useEffect(() => {
    setShowModal(show);
    if (jsonData !== undefined) {
      setViewType(jsonData.action);        
      //const new_obj = iterate(JSON.parse(JSON.stringify(jsonData)));      
      const new_obj = jsonData;      
      setDataView(new_obj);
    }    
  }, [jsonData, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility();
  };


  if (viewType === "console output") {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Tool Output: <span className="upper-case-first">{jsonData.step_configuration ? jsonData.step_configuration.tool_identifier : null }</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="m-2">
              <div className="float-right mr-2">{format(new Date(jsonData.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</div> 
              <span className="text-muted ml-2">Step: </span> {jsonData.step_name}</div>
            
            { typeof(jsonData.api_response) === "string" ?
              <div className="console-text m-3">
                {jsonData.api_response}
              </div> : 
              <div className="m-3">

                {Object.keys(jsonData.api_response).map((row, key) => {
                  return <div key={key} className="console-text mb-1">
                    {typeof(jsonData.api_response[row]) === "string" ? 
                      jsonData.api_response[row] :
                      <div className="m-3">{JSON.stringify(jsonData.api_response[row])}</div>
                    }
                  </div>;
                })}

              </div> }                   
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
      </> );} 
  else {
    return (
      <>
        <Modal show={showModal} size={size} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{header}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="m-3">
              <ReactJson src={dataView} displayDataTypes={false} />               
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
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
  jsonData: PropTypes.object,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func
};

export default ModalActivityLogsDialog;