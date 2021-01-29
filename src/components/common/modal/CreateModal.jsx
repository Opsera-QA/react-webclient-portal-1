import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import {unsavedChanges} from "../tooltip/popover-text";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateModal({ children, objectType, showModal, handleCancelModal, loadData}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
  }, []);

  const handleClose = () => {
    loadData();
    toastContext.removeInlineMessage();
    handleCancelModal();
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New {objectType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-block-shaded m-3 full-height">
          {toastContext.getInlineBanner()}
          <div className="p-3">
            {children}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <TooltipWrapper innerText={unsavedChanges}>
          <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
        </TooltipWrapper>
      </Modal.Footer>
    </Modal>
  );
}


CreateModal.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleConfirmModal: PropTypes.func,
  handleCancelModal: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default CreateModal;


