/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { RMContext } from "./RMContext";

class RMModal extends PureComponent {
  static contextType = RMContext
  state = {
    validationError: false
  };

  handlecancel = () => {
    const { handleModalCancel, service, category } = this.context;
    this.setState({
      validationError: false
    });
    handleModalCancel({ service, category });
  };
  handleSave = () => {
    const { handleModalSave, service, category, validate } = this.context;
    if (validate()) {
      this.setState({
        validationError: false
      });
      handleModalSave({ service, category });
    } else {
      this.setState({
        validationError: true
      });
      console.log("validation failed");
    }
  };

  isChecked = (service, name, val) => {
    const { services } = this.context;
    if (!services || !services[service] || !services[service][name])
      return false;
    return services[service][name].includes(val);
  };

  onClose = () => {
    const { handleModalCancel, service, category } = this.context;
    this.setState({
      validationError: false
    });
    handleModalCancel({ service, category });
  };

  componentDidMount() {
    this.inputs = [];
  }

  render() {
    const { validationError } = this.state;
    const {
      modalOpen,
      category,
      service,
      services = {},
      handleServiceChange,
      handleServiceCheckBoxChange,
      fields = [],
    } = this.context;
    return (

      <Modal show={modalOpen} centered onHide={this.onClose}>
        <Modal.Header closeButton >
          <Modal.Title style={{ fontSize: "1.3em" }}>{category}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 modal-body-text-block">
          <div className="mb-3">This will register a new {service} instance. Are you sure you want to proceed?
            {/* In order to do so, connection details are needed below. */}
          </div>

          <Form>
            {/* {fields.length === 0 && (
              <Form.Group controlId="formCheckboxDecrypt">
                <Form.Check type="checkbox" label="Store Instance Decrypted"
                  style={{ marginRight: "10px" }}
                  checked={this.isChecked(service, "decrypt", "decrypt")}
                  onChange={() => handleServiceCheckBoxChange(service, "decrypt", "decrypt")}
                />
              </Form.Group>
            )} */}

            {validationError && (<Alert variant="danger">Jenkins Password is required.</Alert>)}
            {fields.length > 0 &&
              fields.map(
                (({ name, type, password, values, key }) => {
                  if (type === "checkbox") {
                    return (
                      <>
                        {values.map(val => (
                          <Form.Group controlId={key}>
                            <Form.Check type="checkbox" key={val} label={val}
                              style={{ marginRight: "10px" }}
                              checked={this.isChecked(service, name, val)}
                              onChange={() => handleServiceCheckBoxChange(service, name, val)}
                            />
                          </Form.Group>
                        ))}
                      </>
                    );
                  }
                  return (
                    <Form.Group controlId={key}>
                      <Form.Label> {name} {"   "}</Form.Label>
                      <Form.Control
                        type={password ? "password" : "text"}

                        placeholder={name}
                        name={`${service}//${key}`}
                        value={
                          services[service]
                            ? services[service][key] || ""
                            : ""
                        }
                        onChange={handleServiceChange}
                      />
                    </Form.Group>
                  );
                })
              )
            }

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={this.handlecancel}
          > Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RMModal;
