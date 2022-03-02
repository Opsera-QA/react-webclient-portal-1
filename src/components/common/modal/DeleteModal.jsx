import React from "react";
import PropTypes from "prop-types";
import {Row, Col, Button, Modal } from "react-bootstrap";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import IconBase from "components/common/icons/IconBase";

function DeleteModal({ dataObject, showModal, setShowModal, handleDelete }) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal size="md" show={showModal} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm {dataObject.getType()} Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shaded-panel m-3">
          <div className="p-3">
            <Row>
              <Col sm={1}>
                <div className="mt-2">
                  <IconBase icon={faTrash} iconSize={"lg"} className={"danger-red"}/>
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
        <Button size="sm" variant="secondary" onClick={handleClose}>Cancel</Button>
        <DeleteButton dataObject={dataObject} deleteRecord={handleDelete} />
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


