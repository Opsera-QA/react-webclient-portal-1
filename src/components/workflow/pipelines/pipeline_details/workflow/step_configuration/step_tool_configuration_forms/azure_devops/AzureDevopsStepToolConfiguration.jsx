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
import AzureDevopsToolSelectInput from "./inputs/AzureDevopsToolSelectInput";
import AzureDevopsPipelineSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/inputs/AzureDevopsPipelineSelectInput";

function AzureDevopsStepConfiguration({ stepTool, closeEditorPanel, parentCallback }) {
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
      <AzureDevopsToolSelectInput fieldName={"toolConfigId"} dataObject={azureDevopsStepConfigurationDto} setDataObject={setAzureDevopsStepConfigurationDataDto} />
      <TextInputBase dataObject={azureDevopsStepConfigurationDto} setDataObject={setAzureDevopsStepConfigurationDataDto} fieldName={"organizationName"}/>
      <TextInputBase setDataObject={setAzureDevopsStepConfigurationDataDto} dataObject={azureDevopsStepConfigurationDto} fieldName={"projectName"} />
      <AzureDevopsPipelineSelectInput organization={azureDevopsStepConfigurationDto.getData("organizationName")} projectName={azureDevopsStepConfigurationDto.getData("projectName")} dataObject={azureDevopsStepConfigurationDto} setDataObject={setAzureDevopsStepConfigurationDataDto} fieldName={"azurePipelineId"}/>
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
