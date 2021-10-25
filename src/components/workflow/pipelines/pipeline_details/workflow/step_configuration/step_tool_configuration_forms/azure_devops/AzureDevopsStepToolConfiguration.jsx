import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer
  from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import azureDevopsStepFormMetadata
  from "./azureDevops-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import AzureDevopsToolSelectInput from "./inputs/AzureDevopsToolSelectInput";
import AzureDevopsPipelineSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/inputs/AzureDevopsPipelineSelectInput";
import AzureDevopsProjectSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_devops/inputs/AzureDevopsProjectSelectInput";

function AzureDevopsStepConfiguration({ stepTool, closeEditorPanel, parentCallback }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureDevopsModel, setAzureDevopsModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureDevopsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(stepTool, azureDevopsStepFormMetadata);
    setAzureDevopsModel(azureDevopsConfigurationData);
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
      <AzureDevopsToolSelectInput
        fieldName={"toolConfigId"}
        model={azureDevopsModel}
        setModel={setAzureDevopsModel}
      />
      <AzureDevopsProjectSelectInput
        organization={azureDevopsModel.getData("organizationName")}
        toolConfigId={azureDevopsModel.getData("toolConfigId")}
        model={azureDevopsModel}
        setModel={setAzureDevopsModel}
        fieldName={"projectName"}
      />
      <AzureDevopsPipelineSelectInput
        organization={azureDevopsModel.getData("organizationName")}
        projectName={azureDevopsModel.getData("projectName")}
        toolConfigId={azureDevopsModel.getData("toolConfigId")}
        model={azureDevopsModel}
        setModel={setAzureDevopsModel}
        fieldName={"azurePipelineId"}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureDevopsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func
};

export default AzureDevopsStepConfiguration;
