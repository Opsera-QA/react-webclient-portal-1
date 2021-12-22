import React, { useState } from "react";
import PropTypes from "prop-types";
import ResourceGroupToggleInput from "../inputs/ResourceGroupToggleInput";
import AzureResourceGroupSelectInput from "../inputs/AzureResourceGroupSelect";


function AzureFunctionsZipDeployment({ model, setModel }) {

  if (!model?.getData("applicationType") || model?.getData("applicationType") === "docker") {
    return null;
  }

  return (
    <>
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
