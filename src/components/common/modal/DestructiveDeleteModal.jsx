import React, {useState} from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import TooltipWrapper from "../tooltip/tooltipWrapper";
import {cannotBeUndone} from "../tooltip/popover-text";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function DestructiveDeleteModal({ deleteTopic, showModal, setShowModal, handleDelete }) {
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal size="md" show={showModal} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Destructive Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col>
                <div>This is a destructive deletion process. None of the relevant data can be recovered after deletion.</div>
                <div className="mt-2">If you are absolutely sure you want to delete {deleteTopic}, type &quot;CONFIRM&quot; and click CONFIRM DELETE. </div>
                <div className="mt-2">THIS ACTION CANNOT BE UNDONE.</div>
                <input value={confirmText} className="form-control mt-2" onChange={newText => setConfirmText(newText.target.value)}/>
                <TooltipWrapper innerText={cannotBeUndone}>
                  <Button className="mt-2" disabled={confirmText !== "CONFIRM"} size="sm" variant="danger" onClick={handleDelete}>CONFIRM DELETE</Button>
                </TooltipWrapper>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={handleClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

DestructiveDeleteModal.propTypes = {
  deleteTopic: PropTypes.string,
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DestructiveDeleteModal;


