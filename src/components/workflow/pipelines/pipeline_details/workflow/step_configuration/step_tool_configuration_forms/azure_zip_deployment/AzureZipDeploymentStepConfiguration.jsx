import React, { useEffect, useRef, useState } from "react";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import modelHelpers from "components/common/model/modelHelpers";
import azureZipDeploymentMetadata from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_zip_deployment/azureZipDeployment.metadata";
import AzureToolApplicationSelectInput from "components/common/list_of_values_input/tools/azure/credentials/AzureToolApplicationSelectInput";
import AzureZipDeploymentStepAzureToolSelectInput from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/azure_zip_deployment/inputs/AzureZipDeploymentStepAzureToolSelectInput";
import AzureToolStorageAccountSelectInput from "components/common/list_of_values_input/tools/azure/accounts/storage/AzureToolStorageAccountSelectInput";
import PipelineStepSelectInput from "../../../../../../../common/list_of_values_input/workflow/pipelines/PipelineStepSelectInput";
import AzureResourceGroupSelectInput from "./inputs/AzureResourceGroupSelectInput";
import AzureStorageAccountInput from "./inputs/AzureStorageAccountSelectInput";
import AzureContainerSelectInput from "./inputs/AzureContainerSelectInput";
import UseExistingContainerToggle from "./inputs/UseExistingContainerToggle";

function AzureZipDeploymentStepConfiguration({
  stepTool,
  closeEditorPanel,
  parentCallback,
  plan,
  stepId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [azureZipDeploymentModel, setAzureZipDeploymentModel] =
    useState(undefined);
  const isMounted = useRef(false);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let azureFunctionsConfigurationData =
      modelHelpers.getPipelineStepConfigurationModel(
        stepTool,
        azureZipDeploymentMetadata,
      );
    setAzureZipDeploymentModel(azureFunctionsConfigurationData);
    setIsLoading(false);
  };

  const saveAzureFunctionsStepConfiguration = async () => {
    const item = {
      configuration: azureZipDeploymentModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };

    return await parentCallback(item);
  };

  if (isLoading || azureZipDeploymentModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={azureZipDeploymentModel}
      persistRecord={saveAzureFunctionsStepConfiguration}
      isLoading={isLoading}
    >
      <AzureZipDeploymentStepAzureToolSelectInput
        model={azureZipDeploymentModel}
        setModel={setAzureZipDeploymentModel}
      />
      <AzureToolApplicationSelectInput
        model={azureZipDeploymentModel}
        setModel={setAzureZipDeploymentModel}
        azureToolId={azureZipDeploymentModel?.getData("azureToolId")}
        fieldName={"azureCredentialId"}
      />
      {/*<AzureToolStorageAccountSelectInput*/}
      {/*  model={azureZipDeploymentModel}*/}
      {/*  setModel={setAzureZipDeploymentModel}*/}
      {/*  azureToolId={azureZipDeploymentModel?.getData("azureToolId")}*/}
      {/*  fieldName={"azureStorageAccountName"}*/}
      {/*/>*/}
      <AzureResourceGroupSelectInput
        dataObject={azureZipDeploymentModel}
        setDataObject={setAzureZipDeploymentModel}
        azureToolConfigId={azureZipDeploymentModel?.getData("azureToolId")}
        applicationId={azureZipDeploymentModel?.getData("azureCredentialId")}
      />
      <AzureStorageAccountInput
        dataObject={azureZipDeploymentModel}
        setDataObject={setAzureZipDeploymentModel}
        azureToolConfigId={azureZipDeploymentModel?.getData("azureToolId")}
        applicationId={azureZipDeploymentModel?.getData("azureCredentialId")}
        resourceGroup={azureZipDeploymentModel?.getData("resourceGroup")}
      />
      <UseExistingContainerToggle
        dataObject={azureZipDeploymentModel}
        setDataObject={setAzureZipDeploymentModel}
      />
      <AzureContainerSelectInput
        dataObject={azureZipDeploymentModel}
        setDataObject={setAzureZipDeploymentModel}
        azureToolConfigId={azureZipDeploymentModel?.getData("azureToolId")}
        applicationId={azureZipDeploymentModel?.getData("azureCredentialId")}
        storageName={azureZipDeploymentModel?.getData(
          "azureStorageAccountName",
        )}
        resourceGroup={azureZipDeploymentModel?.getData("resourceGroup")}
        existingContainer={azureZipDeploymentModel?.getData(
          "existingContainer",
        )}
      />
      <PipelineStepSelectInput
        fieldName={"buildStepId"}
        plan={plan}
        stepId={stepId}
        model={azureZipDeploymentModel}
        setModel={setAzureZipDeploymentModel}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AzureZipDeploymentStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
};

export default AzureZipDeploymentStepConfiguration;
