/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { RMContext } from "./RMContext";

class RMModal extends PureComponent {
  static contextType = RMContext
  handlecancel = () => {
    const { handleModalCancel, service, category } = this.context;
    handleModalCancel({ service, category });
  }
  handleSave = () => {
    const { handleModalSave, service, category } = this.context;
    handleModalSave({ service, category });
  }

  isChecked = (service, name, val) => {
    const { services } = this.context;
    if (!services || !services[service] || !services[service][name])
      return false;
    return services[service][name].includes(val);
  }

  onClose = () => {
    const { handleModalCancel, service, category } = this.context;
    handleModalCancel({ service, category });
  }

  componentDidMount() {
    this.inputs = [];
  }

  render() {
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
          <div>This will register a new {service} instance.  Are you sure you want to proceed?</div>
          <div className="text-muted mt-3">Settings:</div>
          <Form>
            {fields.length === 0 && (
              <Form.Group controlId="formCheckboxDecrypt">
                <Form.Check type="checkbox" label="Store Instance Decrypted"
                  style={{ marginRight: "10px" }}
                  checked={this.isChecked(service, "decrypt", "decrypt")}
                  onChange={() => handleServiceCheckBoxChange(service, "decrypt", "decrypt")}
                />
              </Form.Group>
            )}
            {fields.length > 0 &&
              fields.map(
                (({ name, type, password, values, msg = [], key, ...rest }) => {
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
                        ref={el => {
                          if (rest.required) {
                            this.inputs.push(el);
                          }
                        }}
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
            variant="outline-secondary"
            onClick={this.handlecancel}
          > Cancel
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RMModal;
