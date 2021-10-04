import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import {DialogToastContext} from "contexts/DialogToastContext";

function XUnitStepConfiguration({
  stepTool,
  pipelineId,
  stepId,
  createJob,
  closeEditorPanel
}) {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [xunitStepConfigurationDto, setXunitStepConfigurationDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let xunitConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, xunitPipelineStepConfigurationMetadata);

    if (xunitConfigurationData.getData("sourceScript") === true) {
        xunitConfigurationData.setMetaDataFields(xunitPipelineStepConfigurationMetadata.fields);
    }        

    setXunitStepConfigurationDto(xunitConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const handleCreateAndSave = async () => {
    const toolId = xunitStepConfigurationDto?.getData("toolConfigId");
    if (validateRequiredFields() && toolId) {
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
      toastContext.showMissingRequiredFieldsErrorDialog();
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
      <StepConfigJenkinsToolInput model={xunitStepConfigurationDto} setModel={setXunitStepConfigurationDto} />
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
};

export default XUnitStepConfiguration;
