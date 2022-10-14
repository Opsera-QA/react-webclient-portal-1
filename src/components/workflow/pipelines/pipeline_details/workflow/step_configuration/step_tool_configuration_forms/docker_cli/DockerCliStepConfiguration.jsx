import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import dockerCliStepFormMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/docker_cli/dockercli-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import DockerCliDependenciesInputForm from "./subforms/DockerCliDependenciesInputForm";
import DockerCliDockerBuildDetailsInputForm from "./subforms/DockerCliDockerBuildDetailsInputForm";
import DockerCliDockerPushDetailsInputForm from "./subforms/DockerCliDockerPushDetailsInputForm";
import DockerCliScmDetailsInputForm from "./subforms/DockerCliScmDetailsInputForm";

function DockerCliStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, plan, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dockerCliStepConfigurationDataDto, setDockerCliStepConfigurationDataDto] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let dockerCliConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, dockerCliStepFormMetadata);

    setDockerCliStepConfigurationDataDto(dockerCliConfigurationData);

    setIsLoading(false);
  };

  const handleSaveStepConfig = async () => {
    await callbackFunction();
    closeEditorPanel();
  };

  const callbackFunction = async () => {
    let newDataObject = dockerCliStepConfigurationDataDto;
    setDockerCliStepConfigurationDataDto({ ...newDataObject });
    const item = {
      configuration: dockerCliStepConfigurationDataDto.getPersistData(),
    };
    await parentCallback(item);
  };

  if (isLoading || dockerCliStepConfigurationDataDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dockerCliStepConfigurationDataDto}
      persistRecord={handleSaveStepConfig}
      isLoading={isLoading}
    >
      <DockerCliScmDetailsInputForm 
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
      />
      <DockerCliDependenciesInputForm 
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
        plan={plan}
      />      
      <DockerCliDockerBuildDetailsInputForm
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
      />
      <DockerCliDockerPushDetailsInputForm
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
        stepId={stepId}
        plan={plan}
      />
    </PipelineStepEditorPanelContainer>
  );
}

DockerCliStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  plan: PropTypes.array,
  parentCallback: PropTypes.func,
};

export default DockerCliStepConfiguration;
