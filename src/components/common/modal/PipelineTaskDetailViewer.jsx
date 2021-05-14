import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import PipelineTaskTabPanel from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/PipelineTaskTabPanel";


function PipelineTaskDetailViewer({ pipelineTaskData, pipelineData, showModal, setShowModal }) {
  const handleClose = () => {
    setShowModal(false);
  };

  const getPipelineTaskTitle = () => {
    return <span>[{pipelineData.name}] Pipeline Task Details</span>;
  };

  return (
      <Modal show={showModal} size={"lg"} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{getPipelineTaskTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3 shaded-panel">
            <PipelineTaskTabPanel pipelineTaskData={pipelineTaskData} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
  );
}


PipelineTaskDetailViewer.propTypes = {
  pipelineTaskData: PropTypes.object,
  pipelineData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
};

export default PipelineTaskDetailViewer;