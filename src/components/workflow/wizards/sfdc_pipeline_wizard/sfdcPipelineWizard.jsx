import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Moment from "moment";
import SfdcPipelineComponentSelector from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_component_selector/SfdcPipelineComponentSelector";
import SfdcPipelineModifiedFiles from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc_modified_files_selector/SfdcPipelineModifiedFiles";
import ErrorDialog from "components/common/status_notifications/error";
import SfdcPipelineXMLView from "./sfdcPipelineXMLView";
import sfdcPipelineActions from "./sfdc-pipeline-actions";
import SfdcUnitTestSelectionView from "./sfdcUnitTestSelectionView";
import { DialogToastContext } from "contexts/DialogToastContext";
import SfdcPipelineProfileComponentsView from "components/workflow/wizards/SfdcPipelineProfileComponentsView";

// TODO: Don't use this way
const INITIAL_OBJECT_TYPES = {
  managed: false,
  custom: false,
  all: true,
};

const SfdcPipelineWizard = ({
  pipelineId,
  pipeline,
  handlePipelineWizardRequest,
  handleClose,
  refreshPipelineActivityData,
  gitTaskData
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [error, setError] = useState(false);
  const [view, setView] = useState(1);
  const [modifiedFiles, setModifiedFiles] = useState([]);
  const [stepId, setStepId] = useState("");
  const [sfdcToolId, setSFDCToolId] = useState("");
  const [isOrgToOrg, setIsOrgToOrg] = useState(false);
  const [isProfiles, setIsProfiles] = useState(false);
  const [stepToolConfig, setStepToolConfig] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [fromSFDC, setFromSFDC] = useState(false);
  const [fromDestinationSFDC, setFromDestinationSFDC] = useState(false);
  const [fromGit, setFromGit] = useState(false);
  const [fromProfiles, setFromProfiles] = useState(false);
  const [selectedComp, setSelectedComp] = useState([]);
  
  const [nameSpacePrefix, setNameSpacePrefix] = useState("");
  const [unitTestSteps, setUnitTestSteps] = useState([]);
  const [recordId, setRecordId] = useState("");

  const [xml, setXML] = useState("");
  const [destructiveXml, setDestructiveXml] = useState("");

  const [selectedProfileComponent, setSelectedProfileComponent] = useState([]);
  const [profileCompCheckAll, setProfileCompCheckAll] = useState(false);

  const [asOfDate, setAsOfDate] = useState(Moment(new Date(new Date().setDate(new Date().getDate() - 40))).toISOString());

  const [fromDate, setFromDate] = useState(Moment(new Date(new Date().setHours(0,0,0,0))).toISOString());
  const [toDate, setToDate] = useState(Moment(new Date()).toISOString());

  // git tasks specific data
  const [gitTaskId, setGitTaskId] = useState("");

  // TODO: Combine these into metadata for step 1 and keep here to hold state for going back through the wizard
  const [formData, setFormData] = useState(INITIAL_OBJECT_TYPES);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date(new Date().setHours(0,0,0,0)));
  const [selectedToDate, setSelectedToDate] = useState(new Date());
  const [selectedComponentTypes, setSelectedComponentTypes] = useState([]);


  useEffect(() => {
    if(gitTaskData) {
      setGitTaskId(gitTaskData.getData("_id"));
      setStepToolConfig(gitTaskData.getData("configuration"));
      setSFDCToolId(gitTaskData.getData("configuration").sfdcToolId);
      return;
    }
    loadSfdcInitStep(pipeline.workflow.plan);
  }, []);

  //must find step ID of the Sfdc Jenkins Config step (typically first step and has step.tool.job_type set to "sfdc-ant")
  const loadSfdcInitStep = async (steps) => {
    let stepArrayIndex = steps.findIndex(
      (step) => step?.tool && step?.active && (step?.tool?.job_type === "sfdc-ant" || step?.tool?.job_type === "sfdc-ant-profile") && step?.tool?.tool_identifier === "jenkins"
    );
    // console.log(stepArrayIndex);
    if (stepArrayIndex === -1) {
      setError(
        "Warning, this pipeline is missing the default SFDC Jenkins Step needed.  Please edit the workflow and add the SFDC Ant Job setting in order to run this pipeline."
      );
    } else {
      console.log("step ID: ", steps[stepArrayIndex]._id);
      // console.log("uniTest indexes: ", getCustomUnitTestSteps(steps));
      setUnitTestSteps(getCustomUnitTestSteps(steps));
      // TODO: Why is step not just passed down with all of the data pulled off of there?
      setStepId(steps[stepArrayIndex]?._id);
      setSFDCToolId(steps[stepArrayIndex]?.tool?.configuration?.sfdcToolId);
      setStepToolConfig(steps[stepArrayIndex]?.tool?.configuration);
      setIsOrgToOrg(steps[stepArrayIndex]?.tool?.configuration?.isOrgToOrg);
      setIsProfiles(steps[stepArrayIndex]?.tool?.job_type === "sfdc-ant-profile");
    }
  };

  const getCustomUnitTestSteps = (steps) => {
    return steps.map((step, idx) =>
      (step?.tool
      && (step?.tool?.configuration?.jobType === "SFDC VALIDATE PACKAGE XML"
          || step?.tool?.configuration?.jobType === "SFDC UNIT TESTING"
          || step?.tool?.configuration?.jobType === "SFDC DEPLOY"))
      && step?.tool?.configuration?.sfdcUnitTestType === "RunSpecifiedTests" && step?.active ? step : '').filter(String);
  };

  const createJenkinsJob = async () => {
    let createJobResponse;

    if(gitTaskData) {
      // TODO: call a new MS to create and trigger
      try {
        createJobResponse = await sfdcPipelineActions.gitTaskTrigger({"gitTaskId" : gitTaskId}, getAccessToken);
        console.log("createJobResponse: ", createJobResponse);
      } catch (error) {
        console.log("Error posting to API: ", error);
        setError(error);
        createJobResponse = error;
      }
  
      if (createJobResponse && createJobResponse.data && createJobResponse.data.message && createJobResponse.data.message.status === "EXECUTED") {
        // TODO: add a success toast
        toastContext.showInformationToast("A request to start this task has been submitted.  It will begin shortly.", 20);
        // close modal
        handleClose();
      } else {
        setError(createJobResponse && createJobResponse.data && createJobResponse.data.message);
      }
      return;
    }

     const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      buildParams: {
      componentTypes: isProfiles ? JSON.stringify(selectedComponentTypes) : "",
      // packageXml: isProfiles ? "" : xml,
      packageXml: "",
      retrieveFilesFromSFDC: fromSFDC || fromDestinationSFDC ? "true" : "false",
      nameSpacePrefix: nameSpacePrefix
      },
    };

    // console.log(postBody);

    //create jenkins job and automate job creation/updation of validate and deploy jobs
    try {
      createJobResponse = await sfdcPipelineActions.createJobs(postBody, getAccessToken);
      console.log("createJobResponse: ", createJobResponse);
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
      createJobResponse = error;
    }

    if (createJobResponse && createJobResponse.data && createJobResponse.data.message === "success") {
      //trigger refresh of pipeline object!!!
      await refreshPipelineActivityData();

      //trigger start of pipeline & close modal
      await handlePipelineWizardRequest(pipelineId, true);
    } else {
      setError(createJobResponse && createJobResponse.data && createJobResponse.data.message);
    }
  };

  const getBody = () => {
    switch (view) {
      case 1:
        return (
          <SfdcPipelineComponentSelector
            pipelineId={pipelineId}
            stepId={stepId}
            isProfiles={isProfiles}
            stepToolConfig={stepToolConfig}
            sfdcToolId={sfdcToolId}
            handleClose={handleClose}
            setView={setView}
            nameSpacePrefix={nameSpacePrefix}
            setNameSpacePrefix={setNameSpacePrefix}
            setSelectedComponentTypes={setSelectedComponentTypes}
            selectedComponentTypes={selectedComponentTypes}
            setModifiedFiles={setModifiedFiles}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            formData={formData}
            setFormData={setFormData}
            asOfDate={asOfDate}
            setAsOfDate={setAsOfDate}
            unitTestSteps={unitTestSteps}
            selectedComp={selectedComp}
            setSelectedComp={setSelectedComp}
            selectedFromDate={selectedFromDate}
            setSelectedFromDate={setSelectedFromDate}
            selectedToDate={selectedToDate}
            setSelectedToDate={setSelectedToDate}
            gitTaskData={gitTaskData}
            gitTaskId={gitTaskId}
            closePanel={handleClose}
          />
        );
      case 2:
        return(
          <SfdcPipelineModifiedFiles
            pipelineId={pipelineId}
            stepId={stepId}
            handleClose={handleClose}
            setView={setView}
            isOrgToOrg={isOrgToOrg}
            isProfiles={isProfiles}
            stepToolConfig={stepToolConfig}
            modifiedFiles={modifiedFiles}
            fromSFDC={fromSFDC}
            setFromSFDC={setFromSFDC}
            fromGit={fromGit}
            setFromGit={setFromGit}
            setXML={setXML}
            setModifiedFiles={setModifiedFiles}
            fromDestinationSFDC={fromDestinationSFDC}
            setFromDestinationSFDC={setFromDestinationSFDC}
            selectedComponentTypes={selectedComponentTypes}
            recordId={recordId}
            setRecordId={setRecordId}
            unitTestSteps={unitTestSteps}
            selectedComp={selectedComp}
            setSelectedComp={setSelectedComp}
            gitTaskData={gitTaskData}
            gitTaskId={gitTaskId}
            closePanel={handleClose}
          />
       );
      case 3:
        return (
          <SfdcPipelineProfileComponentsView
            pipelineId={pipelineId}
            stepId={stepId}
            handleClose={handleClose}
            setView={setView}
            recordId={recordId}
            unitTestSteps={unitTestSteps}
            setRecordId={setRecordId}
            gitTaskData={gitTaskData}
          />
        );

      case 4:
        return (
          <SfdcPipelineXMLView
            pipelineId={pipelineId}
            stepId={stepId}
            setXML={setXML}
            isProfiles={isProfiles}
            setDestructiveXml={setDestructiveXml}
            handleClose={handleClose}
            setView={setView}
            isOrgToOrg={isOrgToOrg}
            stepToolConfig={stepToolConfig}
            modifiedFiles={modifiedFiles}
            xml={xml}
            destructiveXml={destructiveXml}
            createJenkinsJob={createJenkinsJob}
            recordId={recordId}
            unitTestSteps={unitTestSteps}
            gitTaskData={gitTaskData}
            gitTaskId={gitTaskId}
            closePanel={handleClose}
          />
        );

      case 5:
        return (
          <SfdcUnitTestSelectionView
            pipelineId={pipelineId}
            stepId={stepId}
            handleClose={handleClose}
            setView={setView}
            isOrgToOrg={isOrgToOrg}
            isProfiles={isProfiles}
            fromSFDC={fromSFDC}
            setFromSFDC={setFromSFDC}
            fromGit={fromGit}
            fromDestinationSFDC={fromDestinationSFDC}
            unitTestSteps={unitTestSteps}
          />
        );
    }
  };

  if (error) {
    return (
      <div className="mt-5">
        <ErrorDialog error={error} />
      </div>
    );
  } else {
    return (
      <div className={"m-3"}>
        {getBody()}
      </div>
    );
  }
};

SfdcPipelineWizard.propTypes = {
  pipelineId: PropTypes.string,
  pipeline: PropTypes.object,
  handlePipelineWizardRequest: PropTypes.func,
  handleClose: PropTypes.func,
  refreshPipelineActivityData: PropTypes.func,
  gitTaskData: PropTypes.object,
};

export default SfdcPipelineWizard;
