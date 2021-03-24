import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getMissingRequiredFieldsErrorDialog
} from "../../../../../../../common/toasts/toasts";
import xunitPipelineStepConfigurationMetadata from "./xunitPipelineStepConfigurationMetadata";
import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import StepConfigWorkspaceDeleteToggleInput from "../common/inputs/StepConfigWorkspaceDeleteToggleInput";

import modelHelpers from "components/common/model/modelHelpers";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";


function XUnitStepConfiguration({
  stepTool,
  pipelineId,
  plan,
  stepId,
  parentCallback,
  callbackSaveToVault,
  createJob,
  setToast,
  setShowToast,
  closeEditorPanel
}) {

  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [xunitStepConfigurationDto, setXunitStepConfigurationDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [listOfSteps, setListOfSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let xunitConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, xunitPipelineStepConfigurationMetadata);

    if (xunitConfigurationData.getData("sourceScript") === true) {
        xunitConfigurationData.setMetaDataFields(xunitPipelineStepConfigurationMetadata.fields);
    }        

    setXunitStepConfigurationDto(xunitConfigurationData);

    if (job_type) {
        setJobType(job_type);
    }

    if (threshold) {
        setThresholdType(threshold?.type);
        setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const toolId = xunitStepConfigurationDto.getData("toolConfigId");
    if (validateRequiredFields() && toolId) {
      setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
        buildParams: {},
        // buildParams: {
        //   stepId: formData.stepIdXML && formData.stepIdXML,
        // },
      };

      const toolConfiguration = {
        configuration: xunitStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: "opsera-job",
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  const validateRequiredFields = () => {

    if (
      xunitStepConfigurationDto.getData("toolConfigId").length === 0 ||
      xunitStepConfigurationDto.getData("jenkinsUrl").length === 0 ||
      xunitStepConfigurationDto.getData("jUserId").length === 0 ||
      xunitStepConfigurationDto.getData("jAuthToken").length === 0 ||
      (xunitStepConfigurationDto.getData("buildType") === "docker"
        ? xunitStepConfigurationDto.getData("dockerName").length === 0 || 
        xunitStepConfigurationDto.getData("dockerTagName").length === 0
        : false)
    ) {
        let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
        setToast(toast);
        setShowToast(true);        
        return false;
    } else {
        return true;
    }

  };

  if (isLoading || xunitStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={xunitStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <StepConfigJenkinsToolInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} />
      <StepConfigJenkinsJobInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} typeFilter={"UNIT TESTING"} />
      <StepConfigJenkinsAccountInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} />
      <StepConfigBitbucketWorkspaceInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} />
      <StepConfigGitRepositoryInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} />
      <StepConfigGitBranchInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} />
      <StepConfigWorkspaceDeleteToggleInput dataObject={xunitStepConfigurationDto} setDataObject={setXunitStepConfigurationDto} fieldName={"workspaceDeleteFlag"} />
    </PipelineStepEditorPanelContainer>
  );

}

XUnitStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.object,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default XUnitStepConfiguration;
