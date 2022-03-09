import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ReactJson from "react-json-view";
import IconBase from "components/common/icons/IconBase";

// TODO: Remove or turn into overlay and refactor
function CustomModalDialog({ header, message, button, size, handleConfirmModal, handleCancelModal, jsonView, jsonMessage }) {
  const [show, setShow] = useState(true);
  const [displayJson, setDisplayJson] = useState(false);
  
  useEffect(() => {
    setShow(true);
    setDisplayJson(jsonView === "true");
  }, []);

  const handleClose = () => {
    setShow(false);
    handleCancelModal();
  };

  const handleConfirm = () => {
    setShow(false);
    handleConfirmModal();
  };

  return (
    <>
      <Modal show={show} size={size} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-3 pt-2">
            {
              displayJson ? 
                <>  
                  <ReactJson src={jsonMessage} displayDataTypes={false} />               
                </> : 
                <div style={{ overflowWrap: "break-word" }}>{message}</div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          {
            !displayJson && handleConfirmModal !== undefined ? 
              <Button variant="success" onClick={() => handleConfirm()}>
                <IconBase icon={faCheck} />
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
  size: PropTypes.string,
  handleConfirmModal: PropTypes.func,
  handleCancelModal: PropTypes.func.isRequired,
  jsonView: PropTypes.string,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default CustomModalDialog;


