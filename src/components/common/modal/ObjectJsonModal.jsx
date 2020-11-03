import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import ReactJson from "react-json-view";

function ObjectJsonModal({ header, size, jsonData, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);
  const [dataView, setDataView] = useState(jsonData);
  
  useEffect(() => {
    setShowModal(show);
    if (jsonData !== undefined) {
      const new_obj = jsonData;
      setDataView(new_obj);
    }    
  }, [jsonData, show]);

  const handleClose = () => {
    setShowModal(false);
    setParentVisibility();
  };

  return (
    <>
      <Modal show={showModal} size={size} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3">
            <ReactJson src={dataView} displayDataTypes={false}/>
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


ObjectJsonModal.propTypes = {
  jsonData: PropTypes.object,
  header: PropTypes.string,
  size: PropTypes.string,  
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func
};

export default ObjectJsonModal;