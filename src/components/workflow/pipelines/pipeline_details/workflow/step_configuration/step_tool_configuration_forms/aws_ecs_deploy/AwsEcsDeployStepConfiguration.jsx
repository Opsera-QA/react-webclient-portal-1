import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import awsECSDeployStepFormMetadata from "./awsECSDeploy-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";
import DynamicNameToggleInput from "./inputs/DynamicNameToggleInput";
import DeleteResourceToggle from "./inputs/DeleteResourceToggle";
import AwsEcsTaskSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/aws_ecs_deploy/inputs/AwsEcsTaskSelectInput";

function AwsEcsDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [awsEcsDeployModel, setAwsEcsDeployModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let ecsServiceConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      awsECSDeployStepFormMetadata
    );
    setAwsEcsDeployModel(ecsServiceConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: awsEcsDeployModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || awsEcsDeployModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={awsEcsDeployModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <DockerPushStepSelectInput
        dataObject={awsEcsDeployModel}
        setDataObject={setAwsEcsDeployModel}
        plan={plan}
        stepId={stepId}
      />
      <AwsEcsTaskSelectInput model={awsEcsDeployModel} setModel={setAwsEcsDeployModel} />
      <DynamicNameToggleInput
        dataObject={awsEcsDeployModel}
        setDataObject={setAwsEcsDeployModel}
        fieldName={"dynamicServiceName"}
        pipelineId={pipelineId}
      />
      {awsEcsDeployModel && !awsEcsDeployModel?.getData("dynamicServiceName") && (
        <TextInputBase
          dataObject={awsEcsDeployModel}
          setDataObject={setAwsEcsDeployModel}
          fieldName={"ecsServiceName"}
        />
      )}
      <TextInputBase
        dataObject={awsEcsDeployModel}
        setDataObject={setAwsEcsDeployModel}
        fieldName={"ecsServiceContainerPort"}
      />
      {/*<DeleteResourceToggle*/}
      {/*  dataObject={awsEcsDeployModel}*/}
      {/*  setDataObject={setAwsEcsDeployModel}*/}
      {/*  fieldName={"ecsDeleteService"}*/}
      {/*  pipelineId={pipelineId}*/}
      {/*/>*/}
    </PipelineStepEditorPanelContainer>
  );
}

AwsEcsDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AwsEcsDeployStepConfiguration;
