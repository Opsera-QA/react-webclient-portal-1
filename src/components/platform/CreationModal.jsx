import React from "react"
import {Modal, Button, Form } from "react-bootstrap"
import {NewAppContext} from "./context"

class CreationModal extends React.PureComponent {
  state = {
    port: "",
  }
  static contextType = NewAppContext

  handleSave = () => {
    const {handleSave} = this.context
    handleSave()
  }

  handleCancel = () => {
    const {handleCancel} = this.context
    handleCancel()
  }

  handleCheckBoxChange = () => {
    const {handleCheckboxChanged, service} = this.context
    handleCheckboxChanged(service, "decrypt")
  }

  render() {
    const {
      open,
      category,
      service,
      isChecked,
      // data,
      // checkBoxChange,
      // handleCheckboxChanged,
      // handleChange,
    } = this.context
    return (
      <Modal show={open} aria-labelledby="contained-modal-title-vcenter"
      centered onHide={this.handleCancel} >
        <Modal.Header  closeButton>
          <Modal.Title>{category}</Modal.Title></Modal.Header>
        <Modal.Body>
            <h3>{service}</h3>
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
            color="red"
            inverted
            onClick={() => this.handleCancel(service)}
          > Cancel
          </Button>
          <Button color="green" inverted onClick={this.handleSave}>
             Save
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default CreationModal
