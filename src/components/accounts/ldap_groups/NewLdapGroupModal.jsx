import React, { useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ldapGroupFormFields from "./ldap-groups-form-fields.js";

function NewLdapUserModal({ organization, onModalClose, showModal } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [ groupFormList, updateGroupForm] = useState({ ...ldapGroupFormFields });

  const handleClose = () => {
    onModalClose(false);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        All unsaved changes will be lost
      </Popover.Content>
    </Popover>
  );

  const handleFormChange = (groupFormList, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
    updateGroupForm(prevState => ({ 
      ...prevState, 
      [groupFormList.id]: { 
        ...prevState[groupFormList.id],
        ...validateInput
      } 
    }));
  };

  const formFieldType = (formField) => {
    switch (formField.type) {   
    case "select":
      return <Form.Control as="select" disabled={formField.disabled} value={formField.value} onChange={e => handleFormChange(formField, e.target.value)}>
        <option name="Select One" value="" disabled={true}>Select One</option>
        {formField.options.map((option, i) => (
          <option key={i} value={option.value}>{option.name}</option>
        ))} 
      </Form.Control>;   
    case "switch":
      return <Form.Check 
        type="switch"
        id="custom-switch"
        style={{ float: "left" }}
        checked={groupFormList[formField.id].value ? true : false}   
        label=""
        placeholder="Please select"
        onChange={e => {  
          handleFormChange(formField, e.target.checked);}
        }
      />;       
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  const isFormValid = (groupFormList.name.value) ? true : false;

  const createGroup = async () => {
    let formData = Object.keys(groupFormList).reduce((obj, key) => {
      obj[key] = groupFormList[key].value;
      return obj;
    }, {});

    let payload = {
      "domain": organization.orgDomain,
      "group": {
        ...formData
      }
    };
    console.log(payload);
    if(isFormValid) {
      try {
        const accessToken = await getAccessToken();
        const response = await axiosApiService(accessToken).post("/users/account/groups/create", payload );
        console.log(response);
        handleClose();
      }
      catch (err) {
        console.log(err.message);
      }
    }
  };

  

  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create New LDAP Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-block m-3 full-height">
            <div className="p-3">
              <Form className="newToolFormContainer">
                <br />
                {Object.values(groupFormList).map((formField, i) => {
                  if(formField.toShow ) {
                    return(
                      <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                        <Form.Label column sm="3">
                          {formField.label} 
                          {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                        </Form.Label>
                        <Col sm="9" className="text-right">
                          {formFieldType(formField)}
                          <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    );
                  }
                })}
              </Form>
              <div className="text-right m-2">
                <Button size="sm" variant="primary" onClick={createGroup} disabled={!isFormValid}><FontAwesomeIcon icon={faSave}  fixedWidth /> Save</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <OverlayTrigger trigger={["hover", "hover"]} placement="top" overlay={popover}>
            <Button size="sm" variant="secondary" onClick={handleClose}>Close</Button>
          </OverlayTrigger>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewLdapUserModal.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default NewLdapUserModal;


