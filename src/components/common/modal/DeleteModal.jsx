import React from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import {cannotBeUndone} from "../tooltip/popover-text";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// TODO: Improve styling
function DeleteModal({ dataObject, showModal, setShowModal, handleDelete }) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal size="md" show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm {dataObject.getType()} Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col sm={1}>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faTrash} size={"lg"} className="danger-red"/>
                </div>
              </Col>
              <Col sm={11}>
                <div>Data cannot be recovered once this {dataObject.getType()} is deleted.</div>
                <div>Do you still want to proceed?</div>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <TooltipWrapper>
          <Button size="sm" variant="secondary" onClick={handleClose}>Cancel</Button>
        </TooltipWrapper>
        <TooltipWrapper innerText={cannotBeUndone}>
          <Button size="sm" variant="danger" onClick={handleDelete}>Delete {dataObject.getType()}</Button>
        </TooltipWrapper>
      </Modal.Footer>
    </Modal>
  );
}

DeleteModal.propTypes = {
  dataObject: PropTypes.object,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteModal;


