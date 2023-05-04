import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function ModalLogsDialog({ header, size, jsonMessage, dataType, show, setParentVisibility }) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // console.log("show: ", show);
    // console.log("DATA", jsonMessage);
    setShowModal(show);
  }, [jsonMessage, show]);

  const handleClose = () => {
    // console.log("CLOSING!");
    setShowModal(false);
    setParentVisibility(false);
  };

  return (
    <>
      <Modal show={showModal} size={size} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pre">
            <StandaloneJsonField json={jsonMessage} displayDataTypes={false} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ModalLogsDialog.propTypes = {
  header: PropTypes.string,
  size: PropTypes.string,
  jsonMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dataType: PropTypes.string,
  show: PropTypes.bool,
  setParentVisibility: PropTypes.func,
};

export default ModalLogsDialog;
