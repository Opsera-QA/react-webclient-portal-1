import React, { useState } from "react";
import PropTypes from "prop-types";
import AksServiceDeployStepAzureToolSelectInput from "../inputs/azure/AzureToolSelectInput";
import AksServiceDeployStepApplicationSelectInput from "../inputs/azure/AzureApplicationSelectInput";
import AksServiceDeployStepClusterSelectInput from "../inputs/azure/AzureClusterSelectInput";
import AksResourceGroupSelectInput from "../inputs/azure/AzureResourceGroupSelect";
import AzureToolStorageAccountSelectInput from "../../../../../../../../common/list_of_values_input/tools/azure/accounts/storage/AzureToolStorageAccountSelectInput";

function BackendStateAzure({ model, setModel }) {
  if (!model?.getData("backendState") || model?.getData("backendState") !== "AZUREM") {
    return null;
  }

  return (
    <>
      <AksServiceDeployStepAzureToolSelectInput model={model} setModel={setModel} />
      <AksServiceDeployStepApplicationSelectInput model={model} setModel={setModel} />
      <AzureToolStorageAccountSelectInput
        model={model}
        setModel={setModel}
        azureToolId={model?.getData("azureToolConfigId")}
        fieldName={"storageName"}
      />
      <AksServiceDeployStepClusterSelectInput
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
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default BackendStateAzure;
