import React, { useState } from "react";
import PropTypes from "prop-types";
import AksServiceDeployStepAzureToolSelectInput from "../inputs/azure/AzureToolSelectInput";
import AksServiceDeployStepApplicationSelectInput from "../inputs/azure/AzureApplicationSelectInput";
import AksServiceDeployStepClusterSelectInput from "../inputs/azure/AzureContainerSelectInput";
import AksResourceGroupSelectInput from "../inputs/azure/AzureResourceGroupSelect";
import AzureStorageAccountInput from "../inputs/azure/AzureStorageAccountSelectInput";
import AzureContainerSelectInput from "../inputs/azure/AzureContainerSelectInput";

function BackendStateAzure({ model, setModel }) {
  if (!model?.getData("backendState") || model?.getData("backendState") !== "AZURERM") {
    return null;
  }

  return (
    <>
      <AksServiceDeployStepAzureToolSelectInput model={model} setModel={setModel} />
      <AksServiceDeployStepApplicationSelectInput model={model} setModel={setModel} />
      <AzureStorageAccountInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureCPToolConfigId")}
        applicationId={model?.getData("azureCPCredentialId")}
      />
      <AksResourceGroupSelectInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureCPToolConfigId")}
        azureApplication={model?.getData("azureCPCredentialId")}
      />
      <AzureContainerSelectInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureCPToolConfigId")}
        applicationId={model?.getData("azureCPCredentialId")}
        storageName={model?.getData("storageName")}
        resourceGroup={model?.getData("resourceGroup")}
      />
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default BackendStateAzure;
