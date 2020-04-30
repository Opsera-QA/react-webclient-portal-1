import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import JSONInput from "react-json-editor-ajrm";
import locale    from "react-json-editor-ajrm/locale/en";


function CustomModalDialog({ header, message, button, size, handleConfirmModal, handleCancelModal, jsonView, jsonMessage }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { show: true, displayJson: false }
  );

  useEffect(() => {
    setState({ show: true, displayJson: jsonView === "true" });
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
      <Modal show={state.show} size={size} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            state.displayJson ? 
              <div style={{ maxWidth: "100vw", height: "60vh", border: "1px solid #ced4da", borderRadius: ".25rem" }}>
                <JSONInput
                  placeholder={jsonMessage}
                  theme="light_mitsuketa_tribute"
                  locale={locale}
                  viewOnly="true"
                  confirmGood={false}
                  width="750px"
                  height="58vh"
                />
              </div> : 
              <div style={{ overflowWrap: "break-word" }}>{message}</div>
          }
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
          {
            !state.displayJson ? 
              <Button variant="outline-primary" onClick={() => handleConfirm()}>
                <FontAwesomeIcon icon={faCheck} fixedWidth />
                {button ? button : "Confirm"}
              </Button> : null }
        </Modal.Footer>
      </Modal>
    </>
  );
}

CustomModalDialog.propTypes = {
  header: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  button: PropTypes.string,
  handleConfirmModal: PropTypes.func.isRequired,
  handleCancelModal: PropTypes.func.isRequired,
  jsonView: PropTypes.string,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default CustomModalDialog;