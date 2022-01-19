import React, { useState } from "react";
import PropTypes from "prop-types";
import AksServiceDeployStepAzureToolSelectInput from "../inputs/azure/AzureToolSelectInput";
import AksServiceDeployStepApplicationSelectInput from "../inputs/azure/AzureApplicationSelectInput";
import AksServiceDeployStepClusterSelectInput from "../inputs/azure/AzureContainerSelectInput";
import AksResourceGroupSelectInput from "../inputs/azure/AzureResourceGroupSelect";
import AzureStorageAccountInput from "../inputs/azure/AzureStorageAccountSelectInput";
import AzureContainerSelectInput from "../inputs/azure/AzureContainerSelectInput";

function BackendStateAzure({ model, setModel }) {
  if (!model?.getData("backendState") || model?.getData("backendState") !== "AZUREM") {
    return null;
  }

  return (
    <>
      <AksServiceDeployStepAzureToolSelectInput model={model} setModel={setModel} />
      <AksServiceDeployStepApplicationSelectInput model={model} setModel={setModel} />
      <AzureStorageAccountInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
      />
      <AksResourceGroupSelectInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureToolConfigId")}
        azureApplication={model?.getData("azureCredentialId")}
      />
      <AzureContainerSelectInput
        dataObject={model}
        setDataObject={setModel}
        azureToolConfigId={model?.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
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
