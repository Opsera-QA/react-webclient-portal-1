import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Row, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { axiosApiService } from "api/apiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faSave } from "@fortawesome/free-solid-svg-icons";
import "components/inventory/tools/tools.css";

import WarningDialog from "../../../../../../../common/status_notifications/WarningDialog";
import JobTypeBuild from "../job-type-build.js";
import JobTypeCodeScan from "../job-type-code-scan.js";
import JenkinsJobTypeCypressUnitTesting from "../job-type-cypress-unit-testing.js";
import JenkinsJobTypeDockerPush from "../job-type-docker-push.js";
import JenkinsJobTypeSendToS3 from "../job-type-sent-to-s3.js";
import JobTypePerformanceTesting from "../job-type-performance-testing.js";
import JenkinsJobTypeShellScript from "../job-type-shell-script.js";
import JenkinsJobTypeUnitFunctionalTest from "../job-type-unit-functional-testing.js";
import JenkinsJobTypePushToGit from "../job-type-push-to-git.js";
import JenkinsJobTypeNUnitUnitTesting from "../job-type-nunit";
import JobTypeSFDC from "../job-type-sfdc";
//import { jobTypes } from "../jenkins-job-metadata";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import Modal from "../../../../../../../common/modal/modal";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import JenkinsJobTypeArtifactoryDockerPush from "../job-type-artifactory-docker-push";

function JenkinsJobEditorPanelV1({ toolData, jobData, loadData, handleClose }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  let toolDataSet = toolData;
  const [jenkinsFormList, updateJenkinsForm] = useState({ ...JobTypeBuild });
  const [formType, setFormType] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [viewForm, toggleViewForm] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const pythonAgentLabelOptions = [
    {
      "name": "Python 2",
      "env" : "python",
      "value": "python2-alpine",
    },
    {
      "name": "Python 3",
      "env" : "python",
      "value": "python3-alpine",
    }
  ];

  const agentLabelOptions = [
    {
      "name": "Ubuntu Agent",
      "env" : "linux",
      "value": "generic-linux",
    }
  ];

  const getAgentLabelsField = (formField, i) => {

    if(!toolData.configuration.autoScaleEnable){
      return (<></>);
    }
    
    if(Object.keys(jenkinsFormList).indexOf("buildType") >= 0 && jenkinsFormList["buildType"].value === 'python'){
      formField.options = pythonAgentLabelOptions;
    }else {
      formField.options = agentLabelOptions;
    }
   
    return (
      <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
        <Form.Label column sm="3">
          {formField.label}
          {formField.rules.isRequired && <span style={{ marginLeft: 5, color: "#dc3545" }}>*</span>}
        </Form.Label>
        <Col sm="9" className="text-right">
          {formFieldType(formField)}
          <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
        </Col>
      </Form.Group>
    );    
  };

  useEffect(() => {
    //Check if data is available before update
    console.log("jobData: " + JSON.stringify(jobData));
    if (Object.keys(jobData).length > 0) {
      handleFormTypeChange(jobData.type[0]);
    } else {
      handleFormTypeChange("BUILD");
      clearData();
    }
  }, []);

  useEffect(() => {
    if (Object.keys(jobData).length > 0) {
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
    case "ARTIFACTORY_DOCKER_PUSH":
      updateJenkinsForm({...JenkinsJobTypeArtifactoryDockerPush});
      break;
    case "SEND S3":
      updateJenkinsForm({ ...JenkinsJobTypeSendToS3 });
      break;
    case "BUILD":
      updateJenkinsForm({ ...JobTypeBuild });
      break;
    case "SFDC PUSH ARTIFACTS":
      updateJenkinsForm({ ...JenkinsJobTypePushToGit });
      break;
    case "NUNIT_UNIT_TESTING":
      updateJenkinsForm({ ...JenkinsJobTypeNUnitUnitTesting });
      break;
    }
    setFormType(type);
  };

  const updateFormWithData = () => {
    setJobName(jobData.name);
    setJobDescription(jobData.description);
    Object.keys(jenkinsFormList).forEach((item, i) => {
      let validateInput = {
        disabled: viewForm ? true : false,
        value: jobData.configuration && jobData.configuration[item] || "",
      };
      updateJenkinsForm(prevState => ({
        ...prevState,
        [item]: {
          ...prevState[item],
          ...validateInput,
        },
      }));
    });
  };


  const clearData = () => {
    setJobName("");
    toggleViewForm(false);
    setJobDescription("");
    Object.keys(jenkinsFormList).forEach((item, i) => {
      let validateInput = {
        value: "",
      };
      updateJenkinsForm(prevState => ({
        ...prevState,
        [item]: {
          ...prevState[item],
          ...validateInput,
        },
      }));
    });
  };

  const handleFormChange = (jenkinsFormList, value) => {
    let validateInput = {
      errorMessage: "",
      touched: true,
      isValid: true,
      value: value,
    };
    updateJenkinsForm(prevState => ({
      ...prevState,
      [jenkinsFormList.id]: {
        ...prevState[jenkinsFormList.id],
        ...validateInput,
      },
    }));
  };

  const formFieldType = (formField) => {
    switch (formField.type) {
    case "select":
      return <Form.Control as="select" disabled={formField.disabled || viewForm } value={formField.value}
                            onChange={e => handleFormChange(formField, e.target.value)}>
            <option name="Select One" value="" disabled={false}>Select One</option>
            {formField.options.map((option, i) => (
              <option key={i} value={option.value}>{option.name}</option>
            ))}
          </Form.Control>;
    default:
      return <Form.Control value={formField.value} disabled={formField.disabled || viewForm}
                           isInvalid={formField.touched && !formField.isValid}
                           onChange={e => handleFormChange(formField, e.target.value)}/>;
    }
  };

  const handleModalClose = () => {
    loadData();
    handleClose();
  };

  const updateJob = async () => {
    //Only extract the value filed before sending to the API
    let formData = Object.keys(jenkinsFormList).reduce((obj, item) => Object.assign(obj, { [item]: jenkinsFormList[item].value }), {});
    let payload = {
      active: true,
      configuration: formData,
      description: jobDescription,
      name: jobName,
      type: formType.split(),
    };

    let action;
    //Check if job is edited/delete or new job
    if (Object.keys(jobData).length > 0) {
      action = "update";
      let index = toolDataSet.jobs.indexOf(jobData);
      toolDataSet.jobs[index] = payload;
    } else {
      action = "create";
      // TODO: check if name is already there and throw err
      const found = toolDataSet.jobs.some(el => el.name === jobName);
      if( found ) {
        toastContext.showUpdateFailureResultDialog("Jenkins Job", "Name already exists");
        return;
      }

      (toolDataSet.jobs || (toolDataSet.jobs = [])).push(payload);
    }

    try {
      const url = "/registry/" + toolData["_id"] + "/update";
      const accessToken = await getAccessToken();
      await axiosApiService(accessToken).post(url, { ...toolDataSet });

      if (action === "update") {
        toastContext.showUpdateSuccessResultDialog("Jenkins Job");
        loadData();
      } else {
        toastContext.showCreateSuccessResultDialog("Jenkins Job");
        // close modal after creating
        handleModalClose();
        // handleClose();
      }
    } catch (error) {
      console.error(error.message);
      if (action === "update") {
        toastContext.showUpdateFailureResultDialog("Jenkins Job", error);
      } else {
        toastContext.showCreateFailureResultDialog("Jenkins Job", error);
      }
    }
  };

  const deleteJob = async () => {
    //Check if job is edited/delete or new job
    if (Object.keys(jobData).length > 0) {
      let index = toolDataSet.jobs.indexOf(jobData);
      toolDataSet.jobs.splice(index, 1);
    }
    try {
      const url = "/registry/" + toolData["_id"] + "/update";
      const accessToken = await getAccessToken();

      await axiosApiService(accessToken).post(url, { ...toolDataSet });
      loadData();
      toastContext.showDeleteSuccessResultDialog("Jenkins Job");
    } catch (error) {
      console.error(error.message);
      toastContext.showDeleteFailureResultDialog("Jenkins Job", error);
    }
  };

  const editJob = () => {
    toggleViewForm(false);
    Object.keys(jenkinsFormList).forEach((item, i) => {
      let validateInput = {
        disabled: false,
      };
      updateJenkinsForm(prevState => ({
        ...prevState,
        [item]: {
          ...prevState[item],
          ...validateInput,
        },
      }));
    });
  };

  return (
    <>
       { viewForm || Object.keys(jobData).length > 0 && 
        <WarningDialog
        warningMessage={
          "Editing this template doesn't update the pipeline configuration, please update the job from pipeline step before running the pipeline."
        }
        alignment={"toolRegistryWarning"}
        />
      }
      {viewForm && <ButtonToolbar className="justify-content-between my-2 ml-2 mr-2">
        <ButtonGroup>
          <Button size="sm" className="mr-2" variant="primary" onClick={() => {
            editJob();
          }}>
            <FontAwesomeIcon icon={faPen} fixedWidth style={{ cursor: "pointer" }}/> Edit Job
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm" className="pull-right mr-2" variant="danger" onClick={() => {
            setShowDeleteModal(true);
          }}>
            <FontAwesomeIcon icon={faTrash} fixedWidth style={{ cursor: "pointer" }}/> Delete Job
          </Button>
        </ButtonGroup>
      </ButtonToolbar>}
      <br/>

      <Form className="newToolFormContainer">
        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Job Type
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control as="select" disabled={viewForm || Object.keys(jobData).length > 0} value={formType}
                          onChange={e => handleFormTypeChange(e.target.value)}>
              <option name="Select One" value="" disabled={true}>Select One</option>
              {jobTypes.map((option, i) => (
                <option key={i} value={option.value}>{option.label}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
      </Form>
      <br/>

      <Form className="newToolFormContainer">
        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Name
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobName} disabled={viewForm} onChange={e => setJobName(e.target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
          <Form.Label column sm="3">
            Description
          </Form.Label>
          <Col sm="9" className="text-right">
            <Form.Control value={jobDescription} disabled={viewForm} onChange={e => setJobDescription(e.target.value)}/>
          </Col>
        </Form.Group>
      </Form>

      <Form className="newToolFormContainer">
        {jenkinsFormList && Object.values(jenkinsFormList).map((formField, i) => {
          if (formField.toShow && formField.linkedId == undefined) {
            return (
              <>
              {formField.id === "agentLabels" ? 
                getAgentLabelsField(formField, i)
              :
              <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                <Form.Label column sm="3">
                  {formField.label}
                  {formField.rules.isRequired && <span style={{ marginLeft: 5, color: "#dc3545" }}>*</span>}
                </Form.Label>
                <Col sm="9" className="text-right">
                  {formFieldType(formField)}
                  <Form.Control.Feedback type="invalid">{formField.errorMessage}</Form.Control.Feedback>
                </Col>
              </Form.Group>
              }
              </>
            );
          } else if (formField.linkedId && jenkinsFormList[formField.linkedId].value === formField.linkedValue) {
            return (
              <Form.Group key={i} controlId="formPlaintextEmail" className="mt-2 vertical-center-cols-in-row">
                <Form.Label column sm="3">
                  {formField.label}
                  {formField.rules.isRequired && <span style={{ marginLeft: 5, color: "#dc3545" }}>*</span>}
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
        {!viewForm && Object.keys(jobData).length > 0 &&
        <Button size="sm" variant="secondary" onClick={()=> toggleViewForm(true)} className="mr-2">Cancel</Button>}
        {!viewForm &&
        <Button size="sm" variant="primary" onClick={updateJob}><FontAwesomeIcon icon={faSave} fixedWidth/>Save
          Job</Button>}
      </div>

      {showDeleteModal ? <Modal header="Confirm Jenkins Job Delete"
                                message="Warning! Data cannot be recovered once this job is deleted. Do you still want to proceed?"
                                button="Confirm"
                                handleCancelModal={() => setShowDeleteModal(false)}
                                handleConfirmModal={() => deleteJob()}/> : null}
    </>
  );
}

JenkinsJobEditorPanelV1.propTypes = {
  jobAction: PropTypes.string,
  toolData: PropTypes.object,
  jobData: PropTypes.object,
  accessToken: PropTypes.string,
  setJobAction: PropTypes.func,
  loadData: PropTypes.func,
  handleClose: PropTypes.func,
};


export default JenkinsJobEditorPanelV1;
