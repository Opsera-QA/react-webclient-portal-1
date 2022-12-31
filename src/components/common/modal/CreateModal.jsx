import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {unsavedChanges} from "../tooltip/popover-text";
import {DialogToastContext} from "contexts/DialogToastContext";

function CreateModal({ children, objectType, objectMethod, showModal, handleCancelModal, loadData}) {
  const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    toastContext.removeInlineMessage();
  }, []);

  const handleClose = () => {
    loadData();
    toastContext.removeInlineMessage();
    handleCancelModal();
  };

  const getTitle = () => {
    if(objectMethod === "create") {
      return(<>Create New {objectType}</>);
    } else {
      return(<>Update {objectType}</>);
    }
  };

  return (
    <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()}</Modal.Title>
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

CreateModal.defaultProps = {
  objectMethod: "create"
};

CreateModal.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  objectMethod: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleConfirmModal: PropTypes.func,
  handleCancelModal: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default CreateModal;


