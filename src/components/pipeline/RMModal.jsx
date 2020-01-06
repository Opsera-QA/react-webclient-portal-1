import React from "react"
import { Modal, Form, Button } from 'react-bootstrap';
import {RMContext} from "./RMContext"

class RMModal extends React.PureComponent {
  static contextType = RMContext
  handlecancel = () => {
    const {handleModalCancel, service, category} = this.context
    handleModalCancel({service, category})
  }
  handleSave = () => {
    const {handleModalSave, service, category} = this.context
    if (this.validate()) {
      handleModalSave({service, category})
    }
  }

  validate = () => {
    const {service} = this.context
    if (!service.includes("Jenkins Pipeline")) {
      return true
    }
    const errors = []
    if (this.inputs.length > 0) {
      this.inputs.forEach(input => {
        if (input && input.value.length === 0) {
          errors.push("")
          input.parentNode.classList.add("error")
        }
      })
    }
    return errors.length === 0
  }

  isChecked = (service, name, val) => {
      console.log(service + "+" + name + "+" + val)
    const {services} = this.context
    if (!services || !services[service] || !services[service][name])
      return false
    console.log(services[service][name].includes(val));  
    return services[service][name].includes(val)
  }

  onClose = () => {
    const {handleModalCancel, service, category} = this.context
    handleModalCancel({service, category})
  }

  componentDidMount() {
    this.inputs = []
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
    } = this.context
    return (
    
    <Modal show={modalOpen} 
    centered onClose={this.onClose} >
      <Modal.Header >
        <Modal.Title>{category}</Modal.Title></Modal.Header>
      <Modal.Body>
          <h3>{service}</h3>
          <Form>
              {fields.length === 0 && (
                  <Form.Group controlId="formCheckboxDecrypt">
                  <Form.Check type="checkbox" label="Decrypt"
                    style={{marginRight: "10px"}}
                    checked={this.isChecked(service, "decrypt")}
                    onChange={() => handleServiceCheckBoxChange(service, "decrypt", "decrypt") }
                  />
                </Form.Group>
              )}
              {fields.length > 0 && 
                fields.map(
                    (({name, type, password, values, msg = [], key, ...rest}) => {
                        if(type === "checkbox") {
                            return (
                                <>
                                {values.map(val => (
                                    <Form.Group controlId={key}>
                                        <Form.Check type="checkbox" key={val} label={val}
                                            style={{marginRight: "10px"}}
                                            checked={this.isChecked(service, name, val)}
                                            onChange={() => handleServiceCheckBoxChange(service, name, val) }
                                        />
                                    </Form.Group>
                                ))}
                                </>
                            )
                        }
                        return (
                            <Form.Group controlId={key}>
                                <Form.Label> {name} {`   `}</Form.Label>
                                <Form.Control
                                    type={password ? "password" : "text"}
                                    ref={el => {
                                        if (rest.required) {
                                          this.inputs.push(el)
                                        }
                                      }}
                                    placeholder={name}
                                    name="domain"
                                    value={
                                        services[service]
                                          ? services[service][key] || ""
                                          : ""
                                      }
                                    onChange={handleServiceChange}
                                />
                            </Form.Group>
                        )
                    })
                    )
              }
              
          </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button
          color="red"
          inverted
          onClick={() => this.handleCancel}
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

export default RMModal
