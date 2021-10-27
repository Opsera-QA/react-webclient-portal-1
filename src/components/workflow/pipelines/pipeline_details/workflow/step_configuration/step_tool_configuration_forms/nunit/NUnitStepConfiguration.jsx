import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import nunitStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/nunit-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import NUnitStepJenkinsToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitStepJenkinsToolSelectInput";
import NUnitStepJenkinsJobSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitStepJenkinsJobSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
import NUnitJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitJenkinsAccountInput";
import NUnitGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitGitRepositoryInput";
import NUnitGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitGitBranchInput";
import NUnitBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/NUnitBitbucketWorkspaceInput";
import AgentLabelsSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsSelectInput";
import WorkspaceDeleteToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/nunit/inputs/WorkspaceDeleteToggleInput";

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
      <NUnitStepJenkinsToolSelectInput
        model={nunitStepConfigurationDto}
        setModel={setNUnitStepConfigurationDataDto}
      />
      <NUnitStepJenkinsJobSelectInput
        model={nunitStepConfigurationDto}
        setModel={setNUnitStepConfigurationDataDto}
      />
      <NUnitJenkinsAccountInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <NUnitBitbucketWorkspaceInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <NUnitGitRepositoryInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <NUnitGitBranchInput  dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} />
      <WorkspaceDeleteToggleInput dataObject={nunitStepConfigurationDto} setDataObject={setNUnitStepConfigurationDataDto} fieldName={"workspaceDeleteFlag"}/>
      {/* <AgentLabelsSelectInput
        dataObject={nunitStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setNUnitStepConfigurationDataDto}
      /> */}
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
