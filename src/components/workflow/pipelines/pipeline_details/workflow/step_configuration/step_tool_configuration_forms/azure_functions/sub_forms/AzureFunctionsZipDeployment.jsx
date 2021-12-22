import React, { useState } from "react";
import PropTypes from "prop-types";
import ResourceGroupToggleInput from "../inputs/ResourceGroupToggleInput";
import AzureResourceGroupSelectInput from "../inputs/AzureResourceGroupSelect";
import AzureFunctionsApplicationTypeSelectInput from "../inputs/AzureFunctionsApplicationTypeSelectInput";


function AzureFunctionsZipDeployment({ model, setModel }) {

  if (!model?.getData("deploymentType") || model?.getData("deploymentType") === "docker") {
    return null;
  }

  return (
    <>
      <AzureFunctionsApplicationTypeSelectInput
        model={model}
        setModel={setModel}
        azureToolId={model?.getData("azureToolConfigId")}
        azureApplicationId={model?.getData("azureCredentialId")}
      />
      <ResourceGroupToggleInput
        model={model}
        setModel={setModel}
        fieldName={"useCustomResourceGroup"}
      />
      {model && model?.getData("useCustomResourceGroup") && (
        <AzureResourceGroupSelectInput
          model={model}
          setModel={setModel}
          azureToolConfigId={model?.getData("azureToolConfigId")}
          azureApplication={model?.getData("azureCredentialId")}
        />
      )
      }
    </>
  );
}

AzureFunctionsZipDeployment.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default AzureFunctionsZipDeployment;
