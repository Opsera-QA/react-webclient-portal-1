import React from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import PipelineStepConfigurationSummary from "./PipelineStepConfigurationSummary";

function PipelineStepConfigurationSummaryModal({ setShowModal, showModal, pipelineData }) {
  const handleClose = () => {
    // loadData();
    setShowModal(false);
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Pipeline Step Summary [{pipelineData?.name}]</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div>
            <PipelineStepConfigurationSummary pipelineData={pipelineData} />
          </div>
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
  pipelineData: PropTypes.object
};

export default PipelineStepConfigurationSummaryModal;


