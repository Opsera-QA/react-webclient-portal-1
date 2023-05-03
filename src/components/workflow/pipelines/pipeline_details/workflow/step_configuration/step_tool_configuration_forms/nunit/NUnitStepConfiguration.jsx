import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import nunitStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/nunit-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import modelHelpers from "components/common/model/modelHelpers";
import StepConfigJenkinsToolInput from "../common/inputs/StepConfigJenkinsToolInput";
import StepConfigJenkinsJobInput from "../common/inputs/StepConfigJenkinsJobInput";
import StepConfigJenkinsAccountInput from "../common/inputs/StepConfigJenkinsAccountInput";
import StepConfigBitbucketWorkspaceInput from "../common/inputs/StepConfigBitbucketWorkspaceInput";
import StepConfigGitRepositoryInput from "../common/inputs/StepConfigGitRepositoryInput";
import StepConfigGitBranchInput from "../common/inputs/StepConfigGitBranchInput";
import StepConfigWorkspaceDeleteToggleInput from "../common/inputs/StepConfigWorkspaceDeleteToggleInput";

function NUnitStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [nunitStepConfigurationDto, setNUnitStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold, job_type } = stepTool;
    let nunitConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, nunitStepFormMetadata);

    setNUnitStepConfigurationDataDto(nunitConfigurationData);
    console.log(job_type);
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
    const toolId = nunitStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const toolConfiguration = {
        configuration: nunitStepConfigurationDto.getPersistData(),
        threshold: {
          type: thresholdType,
          value: thresholdVal,
        },
        job_type: nunitStepConfigurationDto.getData("jobType"),
      };

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || nunitStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={nunitStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <StepConfigJenkinsToolInput model={nunitStepConfigurationDto} setModel={setNUnitStepConfigurationDataDto} />
      <StepConfigJenkinsJobInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} typeFilter={""} />
      <StepConfigJenkinsAccountInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <StepConfigBitbucketWorkspaceInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <StepConfigGitRepositoryInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <StepConfigGitBranchInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <StepConfigWorkspaceDeleteToggleInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"} />
      <TextInputBase setDataObject={setNUnitStepConfigurationDataDto} dataObject={nunitStepConfigurationDto} fieldName={"solutionFilePath"} />
      <TextInputBase setDataObject={setNUnitStepConfigurationDataDto} dataObject={nunitStepConfigurationDto} fieldName={"solutionFileName"} />
      <TextInputBase setDataObject={setNUnitStepConfigurationDataDto} dataObject={nunitStepConfigurationDto} fieldName={"dllFilePath"} />
      <TextInputBase setDataObject={setNUnitStepConfigurationDataDto} dataObject={nunitStepConfigurationDto} fieldName={"dllFileName"} />
    </PipelineStepEditorPanelContainer>
  );
}

NUnitStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default NUnitStepConfiguration;
