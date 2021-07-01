import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import awsECSDeployStepFormMetadata
  from "./awsECSDeploy-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import DockerPushStepSelectInput from "./inputs/DockerPushStepSelectInput";
import TaskSelectInput from "./inputs/TaskSelectInput";

function AWSECSDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan,stepId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureDevopsModel, setAWSECSDeployModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureDevopsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, awsECSDeployStepFormMetadata);
    setAWSECSDeployModel(azureDevopsConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: azureDevopsModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || azureDevopsModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureDevopsModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <DockerPushStepSelectInput
        dataObject={azureDevopsModel}
        setDataObject={setAWSECSDeployModel}
        plan={plan}
        stepId={stepId}
      />
      <TaskSelectInput
        dataObject={azureDevopsModel}
        setDataObject={setAWSECSDeployModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AWSECSDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default AWSECSDeployStepConfiguration;
