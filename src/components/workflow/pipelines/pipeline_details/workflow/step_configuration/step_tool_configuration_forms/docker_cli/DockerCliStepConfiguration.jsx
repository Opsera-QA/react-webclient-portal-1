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
import DockerCliOutputVariablesInputForm from "./subforms/DockerCliOutputVariablesInputForm";
import pipelineActions from "components/workflow/pipeline-actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import thresholdMetadata from "components/common/metadata/pipelines/thresholdMetadata";

function DockerCliStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, plan, parentCallback, pipelineStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dockerCliStepConfigurationDataDto, setDockerCliStepConfigurationDataDto] = useState(undefined);
  const [thresholdModel, setThresholdModel] = useState(undefined);
  const {
    cancelTokenSource,
    toastContext,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let dockerCliConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, dockerCliStepFormMetadata);

    setDockerCliStepConfigurationDataDto(dockerCliConfigurationData);

    const thresholdModel = modelHelpers.parseObjectIntoModel(pipelineStep?.threshold, thresholdMetadata);

    setThresholdModel(thresholdModel);

    setIsLoading(false);
  };

  const saveRecord = async () => {
    const newPipelineStep = pipelineStep;
    newPipelineStep.tool.configuration = {...dockerCliStepConfigurationDataDto.getPersistData()};
    newPipelineStep.threshold = {...thresholdModel.getPersistData()};
  
    const response = await pipelineActions.updatePipelineStepByIdV2(
      getAccessToken,
      cancelTokenSource,
      pipelineId,
      pipelineStep?._id,
      newPipelineStep,
    );
  
    // TODO: This check is probably not necessary but leaving it in for safety for now.
    if (response?.status === 200) {
      closeEditorPanel();
    }
  
    return response;
  };

  if (isLoading || dockerCliStepConfigurationDataDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={dockerCliStepConfigurationDataDto}
      persistRecord={saveRecord}
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
        plan={plan}
      />
      <DockerCliDockerPushDetailsInputForm
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
        stepId={stepId}
        plan={plan}
      />
      <DockerCliOutputVariablesInputForm 
        model={dockerCliStepConfigurationDataDto}
        setModel={setDockerCliStepConfigurationDataDto}
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
  pipelineStep: PropTypes.object,
  thresholdModel: PropTypes.object,

};

export default DockerCliStepConfiguration;
