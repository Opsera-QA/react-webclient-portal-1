import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import azureDevopsStepFormMetadata
  from "./azureDevops-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TextInputBase from "../../../../../../../common/inputs/text/TextInputBase";

function AzureDevopsStepConfiguration({ pipelineId, stepTool, stepId, createJob, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureDevopsStepConfigurationDto, setAzureDevopsStepConfigurationDataDto] = useState(undefined);
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    let { threshold } = stepTool;
    let azureDevopsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, azureDevopsStepFormMetadata);

    setAzureDevopsStepConfigurationDataDto(azureDevopsConfigurationData);

    if (threshold) {
      setThresholdType(threshold?.type);
      setThresholdValue(threshold?.value);
    }

    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: azureDevopsStepConfigurationDto.getPersistData(),
      threshold: {
        type: thresholdType,
        value: thresholdVal,
      },
    };
    parentCallback(item);
  };

  if (isLoading || azureDevopsStepConfigurationDto == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureDevopsStepConfigurationDto}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <TextInputBase dataObject={azureDevopsStepConfigurationDto} fieldName={"organizationName"} setDataObject={setAzureDevopsStepConfigurationDataDto}/>
      <TextInputBase setDataObject={setAzureDevopsStepConfigurationDataDto} dataObject={azureDevopsStepConfigurationDto} fieldName={"azurePipelineId"} />
      <TextInputBase setDataObject={setAzureDevopsStepConfigurationDataDto} dataObject={azureDevopsStepConfigurationDto} fieldName={"projectName"} />
      <TextInputBase setDataObject={setAzureDevopsStepConfigurationDataDto} dataObject={azureDevopsStepConfigurationDto} fieldName={"pipelineVersion"} />
    </PipelineStepEditorPanelContainer>
  );
}

AzureDevopsStepConfiguration.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  createJob: PropTypes.func,
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func
};

export default AzureDevopsStepConfiguration;
