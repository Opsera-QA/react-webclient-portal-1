import React, { useContext } from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import {DialogToastContext} from "contexts/DialogToastContext";
import ErrorDialog from "components/common/status_notifications/error";

function UnsavedChangesModal({ model, errors, handleRevert, handleContinueEditing }) {
  const toastContext = useContext(DialogToastContext);

  const handleModalClose = () => {
    toastContext.clearModal();
  };

  const getBody = () => {
    if (Array.isArray(errors) && errors.length > 0) {
      return (
        <>
          <div>You have unsaved changes that cannot be saved.</div>
          {errors.forEach((error, index) => {
            return (<ErrorDialog error={error} key={index} />);
          })}
          <div>Would you like to continue editing or would you like to discard your changes?</div>
        </>
      );
    }

    return (
      <>
        <div>You have unsaved changes that cannot be saved.</div>
        <div>Would you like to continue editing or would you like to discard your changes?</div>
      </>
    );
  };

  return (
    <Modal size="md" show={true} onHide={handleModalClose}centered>
      <Modal.Header closeButton>
        <Modal.Title>Unsaved Changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-3">
          <div className="p-3">
            {getBody()}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="warning" onClick={() => handleRevert(model)}>Discard Changes</Button>
        <Button size="sm" variant="secondary" onClick={() => handleContinueEditing()}>Continue Editing</Button>
      </Modal.Footer>
    </Modal>
  );
}

UnsavedChangesModal.propTypes = {
  errors: PropTypes.array,
  handleContinueEditing: PropTypes.func,
  handleRevert: PropTypes.func,
  model: PropTypes.object
};

export default UnsavedChangesModal;


