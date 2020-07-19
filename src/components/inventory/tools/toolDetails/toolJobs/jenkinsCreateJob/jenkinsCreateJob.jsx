import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import "components/inventory/tools/tools.css";

import JobTypeBuild from "./job-type-build.js";
import JobTypeCodeScan from "./job-type-code-scan.js";
import JenkinsJobTypeCypressUnitTesting from "./job-type-cypress-unit-testing.js";
import JenkinsJobTypeDockerPush from "./job-type-docker-push.js";
import JenkinsJobTypeSendToS3 from "./job-type-sent-to-s3.js";
import JobTypePerformanceTesting from "./job-type-performance-testing.js";
import JenkinsJobTypeShellScript from "./job-type-shell-script.js";

function JenkinsCreateJob(props) {
  const { toolId, toolData, accessToken, jobData } = props;
  let toolDataSet = toolData;
  const [ jenkinsFormList, updateJenkinsForm] = useState({ ...JobTypeBuild });
  const [ formType, setFormType ] = useState("BUILD");
  const [jobName, setJobName ] = useState("");
  const [jobDescription, setJobDescription ] = useState("");

  const jobType = [
    {
      label: "Build",
      value: "BUILD"
    },
    {
      label: "Code Scan",
      value: "CODE-SCAN"
    },
    {
      label: "Unit Test",
      value: "UNIT-TEST"
    },
    {
      label: "Functional Test",
      value: "FUNCTIONAL-TEST"
    },
    {
      label: "Performance Test",
      value: "PERFORMANCE-TEST"
    },
    {
      label: "Sell Script",
      value: "SHELL-SCRIPT"
    },
    {
      label: "Cypress Unit Test",
      value: "CYPRESS-UNIT-TEST"
    },
    {
      label: "Docker",
      value: "DOCKER"
    },
    {
      label: "Send to S3",
      value: "SEND-S3"
    }             
  ];

  useEffect(() => {  
    switch (formType.toUpperCase()) {  
          
    case "CODE-SCAN":  
    case "UNIT-TEST":   
    case "FUNCTIONAL-TEST":        
      updateJenkinsForm({ ...JobTypeCodeScan });
      break;   
    case "PERFORMANCE-TEST":
      updateJenkinsForm({ ...JobTypePerformanceTesting });
      break;             
    case "SHELL-SCRIPT":
      updateJenkinsForm({ ...JenkinsJobTypeShellScript });
      break;
    case "CYPRESS-UNIT-TEST":
      updateJenkinsForm({ ...JenkinsJobTypeCypressUnitTesting });
      break;
    case "DOCKER":
      updateJenkinsForm({ ...JenkinsJobTypeDockerPush });
      break;
    case "SEND-S3":
      updateJenkinsForm({ ...JenkinsJobTypeSendToS3 });
      break;                  
    default:
      updateJenkinsForm({ ...JobTypeBuild });
      break;
    }    
    //Check if data is available before update
    if(Object.keys(jobData).length > 0){ updateFormWithData(); }
    else {
      clearData();
    }

  }, [formType]);

  const updateFormWithData = () => {
    setJobName(jobData.name);
    setJobDescription(jobData.description);

    Object.keys(jenkinsFormList).map((item, i) => {
      let validateInput = {
        value: jobData.configuration[item] || ""
      };
      updateJenkinsForm(prevState => ({ 
        ...prevState, 
        [item]: { 
          ...prevState[item],
          ...validateInput
        } 
      }));
    });
  };


  const clearData = () => {
    setJobName("");
    setJobDescription("");
    Object.keys(jenkinsFormList).map((item, i) => {
      let validateInput = {
        value: ""
      };
      updateJenkinsForm(prevState => ({ 
        ...prevState, 
        [item]: { 
          ...prevState[item],
          ...validateInput
        } 
      }));
    });
  };

  const handleFormChange = (jenkinsFormList, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true, 
      isValid: true,
      value: value
    };
    updateJenkinsForm(prevState => ({ 
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

  const updateJob = async (updateType) => {
    //Only extract the value filed before sending to the API
    let formData = Object.keys(jenkinsFormList).reduce((obj, item) => Object.assign(obj, { [item]: jenkinsFormList[item].value }), {});
    let payload = {
      active: true,
      configuration: formData,
      description: jobDescription,
      name: jobName,
      type: formType.split()
    };

    //Check if job is edited/delete or new job
    if(Object.keys(jobData).length > 0){
      let index =  toolDataSet.jobs.indexOf(jobData);
      if(updateType == "DELETE") {
        toolDataSet.jobs.splice(index, 1);
      }else {
        toolDataSet.jobs[index] = payload;
      }
    }else {
      (toolDataSet.jobs || (toolDataSet.jobs = [])).push(payload);
    }

    try {
      const response = await axiosApiService(
        accessToken
      ).post("/registry/" + toolData._id + "/update", { ...toolDataSet });
      console.log(response.data);
      props.setJobAction("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Form className="newToolFormContainer">
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Job Type
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control as="select" disabled={false} onChange={e => setFormType( e.target.value)}>
              <option name="Select One" value="" disabled={true}>Select One</option>
              {jobType.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))} 
            </Form.Control>
          </Col>
        </Form.Group>

        {Object.keys(jobData).length > 0 && 
        <Form.Group className="mt-2 vertical-center-cols-in-row pr-3" style={{ justifyContent: "flex-end" }}>
          <Button variant="danger" size="sm" onClick={() => updateJob("DELETE")}> Delete Job</Button>
        </Form.Group>
        }

      </Form>
      <br />

      <Form className="newToolFormContainer">
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Name
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobName} onChange={e => setJobName(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Description
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobDescription} onChange={e => setJobDescription(e.target.value)} />
          </Col>
        </Form.Group>
      </Form>

      <Form className="newToolFormContainer">
        {Object.values(jenkinsFormList).map((formField, i) => {
          if(formField.toShow && formField.linkedId == undefined ) {
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
          } else if(formField.linkedId && jenkinsFormList[formField.linkedId].value === formField.linkedValue) {
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
        <Button size="sm" variant="primary" onClick={updateJob}><FontAwesomeIcon icon={faSave} fixedWidth /> Save</Button>
      </div>
    </>
  );
}

JenkinsCreateJob.propTypes = {
  jobAction: PropTypes.string,
  toolData: PropTypes.object,
  accessToken: PropTypes.string
};


export default JenkinsCreateJob;
