import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureWebappsStepFormMetadata from "./azureWebapps-stepForm-metadata";
import AzureWebappsDeploymentTypeSelectInput from "./inputs/AzureWebappsDeploymentTypeSelectInput";
import AzureWebappsStepAzureToolSelectInput from "./inputs/AzureWebappsStepAzureToolSelectInput";
import AzureWebappsStepApplicationSelectInput from "./inputs/AzureWebappsStepApplicationSelectInput";
import AzureResourceGroupSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/inputs/AzureResourceGroupSelect";
import AzureWebappSelectInput from "./inputs/AzureWebappSelectInput";
import AzureAppSettingsInput from "./inputs/AzureAppSettingsInput";
import AzureConnectionStringsInput from "./inputs/AzureConnectionStringsInput";
import AzureWebappsArtifactStepSelectInput from "./inputs/AzureWebappsArtifactStepSelectInput";

function AzureWebappsStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureWebappsModel, setAzureWebappsModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureWebappsStepFormMetadata
    );
    setAzureWebappsModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const saveAzureWebappsStepConfiguration = async () => {
    const item = {
      configuration: azureWebappsModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    await parentCallback(item);
    return closeEditorPanel();
  };

  if (isLoading || azureWebappsModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureWebappsModel}
      persistRecord={saveAzureWebappsStepConfiguration}
      isLoading={isLoading}
    >
      <AzureWebappsDeploymentTypeSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      <AzureWebappsStepAzureToolSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      <AzureWebappsStepApplicationSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        azureToolId={azureWebappsModel?.getData("azureToolConfigId")}
      />
      <AzureResourceGroupSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        azureToolConfigId={azureWebappsModel?.getData("azureToolConfigId")}
        azureApplication={azureWebappsModel?.getData("azureCredentialId")}
      />
      <AzureWebappSelectInput
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}        
        azureToolConfigId={azureWebappsModel?.getData("azureToolConfigId")}
        applicationId={azureWebappsModel?.getData("azureCredentialId")}
        resourceGroup={azureWebappsModel?.getData("resourceGroupName")}
      />
      <AzureAppSettingsInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />
      <AzureConnectionStringsInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
      />      
      <AzureWebappsArtifactStepSelectInput 
        model={azureWebappsModel}
        setModel={setAzureWebappsModel}
        plan={plan}
        stepId={stepId}
        deploymentType={azureWebappsModel?.getData("deploymentType")}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureWebappsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureWebappsStepConfiguration;
