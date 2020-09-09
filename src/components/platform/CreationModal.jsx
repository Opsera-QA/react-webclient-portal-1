import React, { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { NewAppContext } from "./context";

function CreationModal(props) {
  
  const [port, setPort] = useState(0);
  const {  open, service, isChecked, handleSave, handleCancel, handleCheckboxChanged } = useContext(NewAppContext);

  const handleCheckBoxChange = () => {
    handleCheckboxChanged(service, "decrypt");
  };

  return (
    <Modal show={open} aria-labelledby="contained-modal-title-vcenter"
      centered onHide={handleCancel} >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: "1.3em" }}>{service} Creation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3 modal-body-text-block">
        <div>This will register a new {service} instance.  Are you sure you want to proceed?</div>
        {/* <div className="text-muted mt-3">Settings:</div>
          <Form className="p-2">
            <Form.Group controlId="formCheckboxDecrypt">
              <Form.Check type="checkbox" label="Store Instance Decrypted"
                checked={isChecked(service, "decrypt")}
                onChange={handleCheckBoxChange}
              />
            </Form.Group>
          </Form> */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleCancel()}> Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
            Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 

CreationModal.propTypes = {
  tools: PropTypes.array
};

export default CreationModal;