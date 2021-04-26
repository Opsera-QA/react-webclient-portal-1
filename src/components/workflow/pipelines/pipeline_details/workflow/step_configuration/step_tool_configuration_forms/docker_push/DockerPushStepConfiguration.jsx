import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import commandLineStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/command_line/commandline-stepForm-metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DockerPushJenkinsToolInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushJenkinsToolInput";
import DockerPushJenkinsJobInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushJenkinsJobInput";
import modelHelpers from "components/common/model/modelHelpers";
import DockerPushJenkinsAccountInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushJenkinsAccountInput";
import DockerPushGitRepositoryInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushGitRepositoryInput";
import DockerPushGitBranchInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushGitBranchInput";
import DockerPushBitbucketWorkspaceInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushBitbucketWorkspaceInput";
import AgentLabelsMultiSelectInput from "components/common/list_of_values_input/workflow/pipelines/AgentLabelsMultiSelectInput";
import DockerPushSourceScriptToggleInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_push/inputs/DockerPushSourceScriptToggleInput";

function DockerPushStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [jobType, setJobType] = useState("");
  const [dockerPushStepConfigurationDto, setDockerPushStepConfigurationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { job_type } = stepTool;
    let commandLineConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, commandLineStepFormMetadata);

    if (commandLineConfigurationData.getData("sourceScript") === true) {
      commandLineConfigurationData.setMetaDataFields(commandLineStepFormMetadata.fieldsAlt);
    }

    setDockerPushStepConfigurationDataDto(commandLineConfigurationData);

    if (job_type) {
      setJobType(job_type);
    }
    setIsLoading(false);
  };

  const getDynamicFields = () => {
    if (dockerPushStepConfigurationDto.getData("sourceScript") === true) {
      return (
        <div>
          <TextInputBase fieldName={"scriptFilePath"} dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
          <TextInputBase fieldName={"scriptFileName"} dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
        </div>
      );
    }
    return (<TextAreaInput dataObject={dockerPushStepConfigurationDto} fieldName={"commands"} setDataObject={setDockerPushStepConfigurationDataDto}/>);
  };

  const handleCreateAndSave = async () => {
    const toolId = dockerPushStepConfigurationDto.getData("toolConfigId");
    console.log("saving and creating job for toolID: ", toolId);
    if (toolId) {
      // setLoading(true);

      const createJobPostBody = {
        jobId: "",
        pipelineId: pipelineId,
        stepId: stepId,
      };
      console.log("createJobPostBody: ", createJobPostBody);

      const toolConfiguration = {
        configuration: dockerPushStepConfigurationDto.getPersistData(),
        job_type: dockerPushStepConfigurationDto.getData("jobType"),
      };
      console.log("item: ", toolConfiguration);

      await createJob(toolId, toolConfiguration, stepId, createJobPostBody);
    }
  };

  if (isLoading || dockerPushStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dockerPushStepConfigurationDto}
      persistRecord={handleCreateAndSave}
      isLoading={isLoading}
    >
      <DockerPushJenkinsToolInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      <DockerPushJenkinsJobInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      <DockerPushJenkinsAccountInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      <DockerPushBitbucketWorkspaceInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      <DockerPushGitRepositoryInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      <DockerPushGitBranchInput  dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} />
      {/* <AgentLabelsMultiSelectInput
        dataObject={dockerPushStepConfigurationDto}
        fieldName={"agentLabels"}
        setDataObject={setDockerPushStepConfigurationDataDto}
      /> */}
      <DockerPushSourceScriptToggleInput dataObject={dockerPushStepConfigurationDto} setDataObject={setDockerPushStepConfigurationDataDto} fieldName={"sourceScript"}/>
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

DockerPushStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func
};

export default DockerPushStepConfiguration;
