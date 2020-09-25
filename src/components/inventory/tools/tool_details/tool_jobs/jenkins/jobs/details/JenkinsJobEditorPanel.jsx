import React, { useState, useEffect, useContext } from "react";
import {  Button, ButtonGroup, ButtonToolbar, Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import "components/inventory/tools/tools.css";

import JobTypeBuild from "../job-type-build.js";
import JobTypeCodeScan from "../job-type-code-scan.js";
import JenkinsJobTypeCypressUnitTesting from "../job-type-cypress-unit-testing.js";
import JenkinsJobTypeDockerPush from "../job-type-docker-push.js";
import JenkinsJobTypeSendToS3 from "../job-type-sent-to-s3.js";
import JobTypePerformanceTesting from "../job-type-performance-testing.js";
import JenkinsJobTypeShellScript from "../job-type-shell-script.js";
import JenkinsJobTypeUnitFunctionalTest from "../job-type-unit-functional-testing.js"
import JobTypeSFDC from "../job-type-sfdc";
import {jobTypes} from "../jenkins-job-metadata";
import {AuthContext} from "../../../../../../../../contexts/AuthContext";
import Modal from "../../../../../../../common/modal/modal";
import {
  getCreateFailureResultDialog,
  getCreateSuccessResultDialog,
  getDeleteFailureResultDialog,
  getUpdateFailureResultDialog, getUpdateSuccessResultDialog
} from "../../../../../../../common/toasts/toasts";

function JenkinsJobEditorPanel({ toolData, jobData, loadData }) {
  const { getAccessToken } = useContext(AuthContext);
  let toolDataSet = toolData;
  const [ jenkinsFormList, updateJenkinsForm] = useState({ ...JobTypeBuild });
  const [ formType, setFormType ] = useState("");
  const [jobName, setJobName ] = useState("");
  const [jobDescription, setJobDescription ] = useState("");
  const [viewForm, toggleViewForm ] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {   
    //Check if data is available before update
    console.log("jobData: " + JSON.stringify(jobData));
    if(Object.keys(jobData).length > 0){ 
      handleFormTypeChange(jobData.type[0]);
    }
    else {
      handleFormTypeChange("BUILD");
      clearData();
    }
  }, []);

  useEffect(() => {   
    if(Object.keys(jobData).length > 0){ 
      updateFormWithData();
    } 
  }, [formType]);

  const handleFormTypeChange = (type) => {
    switch (type.toUpperCase()) {  
    case "SFDC":        
      updateJenkinsForm({ ...JobTypeSFDC });
      break;    
    case "CODE SCAN":  
      updateJenkinsForm({ ...JobTypeCodeScan });
      break;
    case "UNIT TESTING":   
    case "FUNCTIONAL TESTING":        
      updateJenkinsForm({ ...JenkinsJobTypeUnitFunctionalTest });
      break;   
    case "PERFORMANCE TESTING":
      updateJenkinsForm({ ...JobTypePerformanceTesting });
      break;             
    case "SHELL SCRIPT":
      updateJenkinsForm({ ...JenkinsJobTypeShellScript });
      break;
    case "CYPRESS UNIT TESTING":
      updateJenkinsForm({ ...JenkinsJobTypeCypressUnitTesting });
      break;
    case "DOCKER PUSH":
      updateJenkinsForm({ ...JenkinsJobTypeDockerPush });
      break;
    case "SEND S3":
      updateJenkinsForm({ ...JenkinsJobTypeSendToS3 });
      break; 
    case "BUILD":
      updateJenkinsForm({ ...JobTypeBuild });
      break;
    }   
    setFormType(type);
  }; 

  const updateFormWithData = () => {
    setJobName(jobData.name);
    setJobDescription(jobData.description);
    Object.keys(jenkinsFormList).map((item, i) => {
      let validateInput = {
        disabled: viewForm ? true : false,
        value: jobData.configuration && jobData.configuration[item] || ""
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
    toggleViewForm(false);
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

  const updateJob = async () => {
    //Only extract the value filed before sending to the API
    let formData = Object.keys(jenkinsFormList).reduce((obj, item) => Object.assign(obj, { [item]: jenkinsFormList[item].value }), {});
    let payload = {
      active: true,
      configuration: formData,
      description: jobDescription,
      name: jobName,
      type: formType.split()
    };

    let action;
    //Check if job is edited/delete or new job
    if(Object.keys(jobData).length > 0){
      action = "update";
      let index =  toolDataSet.jobs.indexOf(jobData);
      toolDataSet.jobs[index] = payload;
    }else {
      action = "create";
      (toolDataSet.jobs || (toolDataSet.jobs = [])).push(payload);
    }

    try {
      const response = await axiosApiService(
        getAccessToken
      ).post("/registry/" + toolData["_id"] + "/update", { ...toolDataSet });
      console.log(response.data);
      let toast;
      if (action === "update") {
        toast = getUpdateSuccessResultDialog("Jenkins Job", setShowToast);
        loadData();
      }
      else {
        toast = getCreateSuccessResultDialog("Jenkins Job", setShowToast);
      }
      setToast(toast);
      setShowToast(true);
    } catch (error) {
      console.error(error.message);
      let toast;
      if (action === "update") {
        toast = getUpdateFailureResultDialog("Jenkins Job", error, setShowToast, "top");
      }
      else {
        toast = getCreateFailureResultDialog("Jenkins Job", error, setShowToast);
      }
      setToast(toast);
      setShowToast(true);
    }
  };

  const deleteJob = async () => {
    //Check if job is edited/delete or new job
    if(Object.keys(jobData).length > 0){
      let index =  toolDataSet.jobs.indexOf(jobData);
      toolDataSet.jobs.splice(index, 1);
    }
    try {
      const response = await axiosApiService(
        getAccessToken
      ).post("/registry/" + toolData["_id"] + "/update", { ...toolDataSet });
      console.log(response.data);
      loadData();
    } catch (error) {
      console.error(error.message);
      let toast = getDeleteFailureResultDialog("Jenkins Job", error, setShowToast, "top");
      setToast(toast);
      setShowToast(true);
    }
  };

  const editJob = () => {
    toggleViewForm(false);
    Object.keys(jenkinsFormList).map((item, i) => {
      let validateInput = {
        disabled: false,
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

  return (
    <>
      {showToast && toast}
      {viewForm && <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
        <ButtonGroup> 
          <Button size="sm" className="mr-2" variant="primary" onClick= {() => { editJob(); }} >
            <FontAwesomeIcon icon={faPen} fixedWidth style={{ cursor: "pointer" }} /> Edit Job 
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm" className="pull-right mr-2" variant="danger" onClick= {() => { setShowDeleteModal(true); }} >
            <FontAwesomeIcon icon={faTrash} fixedWidth style={{ cursor: "pointer" }} /> Delete Job
          </Button>
        </ButtonGroup>
      </ButtonToolbar>}
      <br />

      <Form className="newToolFormContainer">
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Job Type
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control as="select" disabled={viewForm} value={formType} onChange={e => handleFormTypeChange( e.target.value)}>
              <option name="Select One" value="" disabled={true}>Select One</option>
              {jobTypes.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))} 
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
      <br />

      <Form className="newToolFormContainer">
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Name
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobName} disabled={viewForm} onChange={e => setJobName(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group  controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Description
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobDescription} disabled={viewForm} onChange={e => setJobDescription(e.target.value)} />
          </Col>
        </Form.Group>
      </Form>

      <Form className="newToolFormContainer">
        {jenkinsFormList && Object.values(jenkinsFormList).map((formField, i) => {
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
        {!viewForm && <Button size="sm" variant="secondary" onClick={() => toggleViewForm(false)} className="mr-2">Cancel</Button>}
        {!viewForm && <Button size="sm" variant="primary" onClick={updateJob}><FontAwesomeIcon icon={faSave} fixedWidth />Save Job</Button>}
      </div>

      {showDeleteModal ? <Modal header="Confirm Jenkins Job Delete"
                               message="Warning! Data cannot be recovered once this job is deleted. Do you still want to proceed?"
                               button="Confirm"
                               handleCancelModal={() => setShowDeleteModal(false)}
                               handleConfirmModal={() => deleteJob()} /> : null}
    </>
  );
}

JenkinsJobEditorPanel.propTypes = {
  jobAction: PropTypes.string,
  toolData: PropTypes.object,
  jobData: PropTypes.object,
  accessToken: PropTypes.string,
  setJobAction: PropTypes.func,
  loadData: PropTypes.func
};


export default JenkinsJobEditorPanel;
