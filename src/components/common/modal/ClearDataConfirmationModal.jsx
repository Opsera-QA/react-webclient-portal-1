import React from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function ClearDataConfirmationModal({ showModal, setShowModal, furtherDetails, clearDataFunction }) {
  const handleClose = () => {
    setShowModal(false);
  };

  const clearValue = () => {
    setShowModal(false);
    clearDataFunction();
  };

  return (
    <Modal size="md" show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Clearing Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="m-3">
          <Row>
            <Col sm={1}>
              <div className="mt-2">
                <IconBase icon={faTrash} iconSize={"lg"} className={"danger-red"}/>
              </div>
            </Col>
            <Col sm={11}>
              <div>Clearing this value will also clear out any dependent fields.</div>
              <div>{furtherDetails}</div>
              <div>Do you still want to proceed?</div>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button size={"sm"} variant={"danger"} onClick={clearValue}>Clear Data</Button>
      </Modal.Footer>
    </Modal>
  );
}

ClearDataConfirmationModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  clearDataFunction: PropTypes.func,
  furtherDetails: PropTypes.any
};

export default ClearDataConfirmationModal;


