import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import ReactJson from "@microlink/react-json-view";
import LoadingDialog from "components/common/status_notifications/loading";

function ObjectJsonModal({ header, size, jsonData, show, setParentVisibility }) {

  const handleClose = () => {
    setParentVisibility(false);
  };

  const getBody = () =>{
    if (jsonData == null) {
      return <LoadingDialog message={"Loading Data"} size={"sm"} />;
    }

    return (<ReactJson src={jsonData} displayDataTypes={false}/>);
  };

  return (
    <Modal show={show} size={size} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-3">
          {getBody()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
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