import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "components/inventory/tools/tools.css";

import jenkinsCreateAccountFormFields from "./jenkins-create-account-form-fields.js";


function JenkinsCreateAccount(props) {
  const { toolId, toolData, accessToken } = props;
  const [ jenkinsCreateAccountFormList, updateJenkinsCreateAccountForm] = useState({ ...jenkinsCreateAccountFormFields });
  const handleFormChange = (jenkinsFormList, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
    updateJenkinsCreateAccountForm(prevState => ({ 
      ...prevState, 
      [jenkinsFormList.id]: { 
        ...prevState[jenkinsFormList.id],
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
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  const createJob = () => {
    //Only extract the value filed before sending to the API
    let formData = Object.keys(jenkinsCreateAccountFormList).reduce((obj, item) => Object.assign(obj, { [item]: jenkinsCreateAccountFormList[item].value }), {});
    console.log(formData);
  };

  return (
    <>
      <Form className="newToolFormContainer">
        {Object.values(jenkinsCreateAccountFormList).map((formField, i) => {
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
        <Button size="sm" variant="secondary" onClick={() => props.setJobAction("")} className="mr-2"> Cancel</Button>
        <Button size="sm" variant="primary" onClick={createJob}><FontAwesomeIcon icon={faSave} fixedWidth /> Save</Button>
      </div>
    </>
  );
}

JenkinsCreateAccount.propTypes = {
  jobAction: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string,
  setJobAction: PropTypes.func
};


export default JenkinsCreateAccount;
