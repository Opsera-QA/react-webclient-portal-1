import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { NewAppContext } from "./context";

class CreationModal extends React.PureComponent {
  state = {
    port: "",
  }
  static contextType = NewAppContext

  handleSave = () => {
    const { handleSave } = this.context;
    handleSave();
  }

  handleCancel = () => {
    const { handleCancel } = this.context;
    handleCancel();
  }

  handleCheckBoxChange = () => {
    const { handleCheckboxChanged, service } = this.context;
    handleCheckboxChanged(service, "decrypt");
  }

  render() {
    const {
      open,
      service,
      isChecked,
      // data,
      // checkBoxChange,
      // handleCheckboxChanged,
      // handleChange,
    } = this.context;
    return (
      <Modal show={open} aria-labelledby="contained-modal-title-vcenter"
        centered onHide={this.handleCancel} >
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
                onChange={this.handleCheckBoxChange}
              />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => this.handleCancel(service)}> Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreationModal;
