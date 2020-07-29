import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Popover, OverlayTrigger, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ldapGroupFormFields from "components/accounts/ldap_groups/ldap-groups-form-fields.js";
import accountsActions from "components/accounts/accounts-actions.js";
function LdapGroupSettings({ groupData, organization, onGroupUpdate } ) {
  const { getAccessToken } = useContext(AuthContext);
  const [ groupFormList, updateGroupForm] = useState({ ...ldapGroupFormFields });

  useEffect(() => {   
    if(Object.keys(groupData).length > 0){ 
      console.log(groupData);
      updateFormWithData();
    } 
  }, []);

  const updateFormWithData = () => {
    Object.keys(groupFormList).map((item, i) => {
      let validateInput = {
        disabled: item == "name" ? true : false,
        value: groupData[item] || ""
      };
      updateGroupForm(prevState => ({ 
        ...prevState, 
        [item]: { 
          ...prevState[item],
          ...validateInput
        } 
      }));
    });
  };

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

  const isFormValid = (groupFormList.name.value && groupFormList.externalSyncGroup.value) ? true : false;


  const updateGroup = async () => {
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
      const response = await accountsActions.updateGroup(payload, getAccessToken);
      console.log(response.data);
      onGroupUpdate(response.data);
    }
  };

  return (
    <>
      <div className="p-3">
        <Form>
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
          <Button size="sm" variant="primary" onClick={ updateGroup}><FontAwesomeIcon icon={faSave} fixedWidth /> Update</Button>
        </div>
      </div>
    </>
  );
}

LdapGroupSettings.propTypes = {
  showModal: PropTypes.bool,
  onModalClose: PropTypes.func,
};

export default LdapGroupSettings;


