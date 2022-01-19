import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TaskActivityTabPanel from "components/tasks/activity_logs/details/TaskActivityTabPanel";

function TaskActivityDetailViewer({ gitTaskActivityData, showModal, setShowModal }) {
  const handleClose = () => {
    setShowModal(false);
  };

  const getPipelineTaskTitle = () => {
    return <span>Git Tasks Activity Log</span>;
  };

  return (
      <Modal show={showModal} size={"lg"} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{getPipelineTaskTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3 shaded-panel">
            <TaskActivityTabPanel gitTaskActivityData={gitTaskActivityData} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
  );
}


TaskActivityDetailViewer.propTypes = {
  gitTaskActivityData: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func
};

export default TaskActivityDetailViewer;