import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function CustomModalDialog({ header, message, button, handleConfirmModal, handleCancelModal }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: true }
  );

  useEffect(() => {
    setState({ show: true });
  }, []);

  const handleClose = () => {
    setState({ show: false });
    handleCancelModal();
  };

  const handleConfirm = () => {
    setState({ show: false });
    handleConfirmModal();
  };

  return (
    <>
      <Modal show={state.show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={() => handleConfirm()}>
            <FontAwesomeIcon icon={faCheck} fixedWidth />
            {button ? button : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CustomModalDialog.propTypes = {
  header: PropTypes.string,
  message: PropTypes.string,
  button: PropTypes.string,
  handleConfirmModal: PropTypes.func.isRequired,
  handleCancelModal: PropTypes.func.isRequired
};

export default CustomModalDialog;