import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import SFDCUnitTestView from "./SFDCUnitTestView";

function SFDCUnitTestModal({ 
  show, 
  pipelineId,
  stepId,
  step,
  sfdcToolId,
  saveConfig,
  handleClose
}) {
  return (
    <Modal
    size="lg"
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>SalesForce Unit Test Configuration</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <SFDCUnitTestView
       pipelineId={pipelineId}
       stepId={stepId}
       step={step}
       sfdcToolId={sfdcToolId}
       saveConfig={saveConfig}
       handleClose={handleClose}
     />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {/* <Button variant="primary" onClick={handleSave}>save</Button> */}
    </Modal.Footer>
  </Modal>
  );
}


SFDCUnitTestModal.propTypes = {
  show: PropTypes.bool, 
  sfdcToolId: PropTypes.string,
  handleClose: PropTypes.func,
  pipelineId: PropTypes.string,
  saveConfig: PropTypes.func,
  stepId: PropTypes.string,
  step: PropTypes.object,
};

export default SFDCUnitTestModal;