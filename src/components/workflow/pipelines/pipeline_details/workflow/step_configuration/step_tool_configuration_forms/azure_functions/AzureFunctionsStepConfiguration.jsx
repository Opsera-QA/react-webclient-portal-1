import React, { useEffect, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureFunctionsStepFormMetadata from "./azureFunctions-stepForm-metadata";
import AzureFunctionsStepApplicationSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/inputs/AzureFunctionsStepApplicationSelectInput";
import AzureFunctionsStepDynamicNameToggleInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/inputs/AzureFunctionsStepDynamicNameToggleInput";
import AzureFunctionsStepRegionSelectInput from "./inputs/AzureFunctionsRegionSelectInput";
import AzureFunctionsStepDeploymentTypeSelectInput from "./inputs/AzureFunctionsDeploymentTypeSelectInput";
import AzureFunctionsStepAzureToolSelectInput
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_functions/inputs/AzureFunctionsStepAzureToolSelectInput";
import AzureFunctionsZipDeployment from "./sub_forms/AzureFunctionsZipDeployment";
import AzureFunctionsDockerDeployment from "./sub_forms/AzureFunctionsDockerDeployment";

function AzureFunctionsStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureFunctionsModel, setAzureFunctionsModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);
  const [azureConfig, setAzureConfig] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      azureFunctionsStepFormMetadata
    );
    setAzureFunctionsModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const saveAzureFunctionsStepConfiguration = async () => {
    const item = {
      configuration: azureFunctionsModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };

   return await parentCallback(item);
  };

  if (isLoading || azureFunctionsModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureFunctionsModel}
      persistRecord={saveAzureFunctionsStepConfiguration}
      isLoading={isLoading}
    >
      <AzureFunctionsStepDeploymentTypeSelectInput
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
      />
      <AzureFunctionsStepAzureToolSelectInput
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
        setAzureConfig={setAzureConfig}
      />
      <AzureFunctionsStepApplicationSelectInput
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
        setApplicationData={setApplicationData}
        azureToolId={azureFunctionsModel?.getData("azureToolConfigId")}
      />
      <AzureFunctionsStepRegionSelectInput
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
        azureToolId={azureFunctionsModel?.getData("azureToolConfigId")}
        azureApplicationId={azureFunctionsModel?.getData("azureCredentialId")}
      />
      <AzureFunctionsStepDynamicNameToggleInput
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
        fieldName={"dynamicServiceName"}
      />
      <AzureFunctionsZipDeployment
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
      />
      <AzureFunctionsDockerDeployment
        model={azureFunctionsModel}
        setModel={setAzureFunctionsModel}
        plan={plan}
        stepId={stepId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureFunctionsStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureFunctionsStepConfiguration;
