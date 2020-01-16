import React from "react";
import {Modal, Button, Form } from "react-bootstrap";
import {NewAppContext} from "./context";

class CreationModal extends React.PureComponent {
  state = {
    port: "",
  }
  static contextType = NewAppContext

  handleSave = () => {
    const {handleSave} = this.context;
    handleSave();
  }

  handleCancel = () => {
    const {handleCancel} = this.context;
    handleCancel();
  }

  handleCheckBoxChange = () => {
    const {handleCheckboxChanged, service} = this.context;
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
        <Modal.Header  closeButton>
          <Modal.Title style={{ fontSize:"1.3em"}}>{service} Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="text-muted h6">Options:</div>
          <Form>
            <Form.Group controlId="formCheckboxDecrypt">
              <Form.Check type="checkbox" label="Decrypt"
                style={{marginRight: "10px"}}
                checked={isChecked(service, "decrypt")}
                onChange={this.handleCheckBoxChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => this.handleCancel(service)}> Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
             Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CreationModal;
