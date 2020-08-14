import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import {cannotBeUndone, unsavedChanges} from "../tooltip/popover-text";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DeleteModal({ objectType, showModal, handleCancelModal, handleDelete }) {
  const handleClose = () => {
    handleCancelModal();
  };

  // TODO: Finish styling
  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm {objectType} Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <Row>
                <Col lg={2}>
                  <FontAwesomeIcon icon={faTrash} className="delete-icon pointer red float-right ml-3" />
                </Col>
                <Col lg={10}>
                  <span>Warning! Data cannot be recovered once this {objectType} is deleted.</span>
                  <span>Do you still want to proceed?</span>
                </Col>
              </Row>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <TooltipWrapper innerText={unsavedChanges}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </TooltipWrapper>
          <TooltipWrapper innerText={cannotBeUndone}>
            <Button size="sm" variant="warning" onClick={handleDelete}>Delete {objectType}</Button>
          </TooltipWrapper>
        </Modal.Footer>
      </Modal>
    </>
  );
}

DeleteModal.propTypes = {
  children: PropTypes.any,
  objectType: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDelete: PropTypes.func,
  handleCancelModal: PropTypes.func.isRequired,
};

export default DeleteModal;


