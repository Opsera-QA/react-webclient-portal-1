import React, { useState } from "react";
import PropTypes from "prop-types";
import AzureResourceGroupSelectInput from "../inputs/AzureResourceGroupSelect";
import AzureFunctionsSelectInput from "../inputs/AzureFunctionsSelectInput";

function AzureExistingFunctionDeployment({ model, setModel }) {
  if (
    !model?.getData("deploymentType") ||
    model?.getData("deploymentType") === "docker" ||
    !model?.getData("existingFunctionName")
  ) {
    return null;
  }

  return (
    <>
      <AzureResourceGroupSelectInput
        model={model}
        setModel={setModel}
        azureToolConfigId={model?.getData("azureToolConfigId")}
        azureApplication={model?.getData("azureCredentialId")}
      />
      <AzureFunctionsSelectInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={"azureFunctionName"}
        azureToolConfigId={model?.getData("azureToolConfigId")}
        applicationId={model?.getData("azureCredentialId")}
        resourceGroup={model?.getData("resourceGroupName")}
      />
    </>
  );
}

AzureExistingFunctionDeployment.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default AzureExistingFunctionDeployment;
