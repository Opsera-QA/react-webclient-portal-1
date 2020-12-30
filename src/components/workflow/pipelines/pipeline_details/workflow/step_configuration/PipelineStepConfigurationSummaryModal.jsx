import React from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import PipelineStepTabPanel from "./PipelineStepTabPanel";

function PipelineStepConfigurationSummaryModal({ setShowModal, showModal, pipelineStepData }) {
  const handleClose = () => {
    // loadData();
    setShowModal(false);
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>[{pipelineStepData?.name}] Pipeline Step Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <PipelineStepTabPanel pipelineStepData={pipelineStepData}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

PipelineStepConfigurationSummaryModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  pipelineStepData: PropTypes.object
};

export default PipelineStepConfigurationSummaryModal;


