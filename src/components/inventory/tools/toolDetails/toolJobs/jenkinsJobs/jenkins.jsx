import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";

import ToolJobFormFields from "../tool-jobs-form-field.js";
import JobTypeBuild from "./job-type-build.js";
import JobTypeCodeScan from "./job-type-code-scan.js";
import JobTypePerformanceTesting from "./job-type-performance-testing.js";
import JobTypeCypressUnitTesting from "./job-type-cypress-unit-testing.js";
import JobTypeDockerPush from "./job-type-docker-push.js";
import JobTypeSendS3 from "./job-type-send-s3.js";

import "components/inventory/tools/tools.css";

function JenkinJobs(props) {
  const { toolId, toolData, accessToken } = props;
  const [ formFieldList, updateFormFields ] = useState({ ...ToolJobFormFields });
  const [ jenkinsFormList, updateJenkinsForm] = useState({ ...JobTypeBuild });
  const [ formType, setFormType ] = useState("");

  const [ tool_list, setToolList ] = useState({
    pipeline: [], 
    tool_type_identifier: []
  });

  useEffect(() => {  
    console.log(formType.toUpperCase());
    switch (formType.toUpperCase()) {
    case "BUILD":
      updateJenkinsForm({ ...JobTypeBuild });
      break;
    case "CHILD-PIPELINE":

      break;    
    case "FUNCTIONAL-TEST":        
    case "UNIT-TEST":
    case "CODE-SCAN":    
      updateJenkinsForm({ ...JobTypeCodeScan });
      break;   
    case "PERFORMANCE-TEST":
      updateJenkinsForm({ ...JobTypePerformanceTesting });
      break;             
    case "PUBLISH":
      Object.assign(jenkinsFormList, JobTypeBuild);
      break;      
    
    case "SOURCE":
      Object.assign(jenkinsFormList, JobTypeBuild);
      break;      
    default:
      Object.assign(jenkinsFormList, JobTypeBuild);
      break;
    }
    
  }, [formType]);

  
 

 

  const handleFormChange = (formField, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
    setFormType(value);

    updateFormFields(prevState => ({ 
      ...prevState, 
      [formField.id]: { 
        ...prevState[formField.id],
        ...validateInput
      } 
    }));

  };

  useEffect(() => {  
    Object.assign(formFieldList, ToolJobFormFields);
    getToolList();
  }, []);

  const getToolList = async () => {
    try {
      const toolResponse = await axiosApiService(accessToken).get("/registry/types", {});
      // const pipelineResponse = await axiosApiService(accessToken).get("/pipelines", {});
      // console.log(pipelineResponse);
      setToolList({
        tool_type_identifier: toolResponse.data,
        pipeline: []
      });

    }
    catch (err) {
      console.log(err.message);
    }
  };

  const formFieldType = (formField) => {
    switch (formField.type) {   
    case "select":
      return <Form.Control as="select" disabled={formField.disabled} value={formField.value} onChange={e => handleFormChange(formField, e.target.value)}>
        <option name="Select One" value="" disabled={true}>Select One</option>
        {tool_list[formField.id].map((option, i) => (
          <option key={i} value={option.identifier}>{option.name}</option>
        ))} 
      </Form.Control>;    
    default:
      return  <Form.Control value={formField.value} disabled={formField.disabled} isInvalid={formField.touched && !formField.isValid} onChange={e => handleFormChange(formField, e.target.value)} />;
    }
  };

  return (
    <>
      <Form className="newToolFormContainer">
        {Object.values(formFieldList).map((formField, i) => {
          if(formField.toShow) {
            return(
              <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                <Form.Label column sm="2">
                  {formField.label} 
                  {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                </Form.Label>
                <Col sm="10" className="text-right">
                  {formFieldType(formField)}
                  <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                </Col>
              </Form.Group>
            );
          }
        })}
      </Form>
      <Form className="newToolFormContainer">
        {Object.values(jenkinsFormList).map((formField, i) => {
          if(formField.toShow) {
            return(
              <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                <Form.Label column sm="2">
                  {formField.label} 
                  {formField.rules.isRequired && <span style={{ marginLeft:5, color: "#dc3545" }}>*</span>}
                </Form.Label>
                <Col sm="10" className="text-right">
                  {formFieldType(formField)}
                  <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                </Col>
              </Form.Group>
            );
          }
        })}
      </Form>
    </>
  );
}

JenkinJobs.propTypes = {
  toolId: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string
};


export default JenkinJobs;
