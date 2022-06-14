import React, { useState } from "react";
import PropTypes from "prop-types";
import ResourceGroupToggleInput from "../inputs/ResourceGroupToggleInput";
import AzureResourceGroupSelectInput from "../inputs/AzureResourceGroupSelect";
import AzureFunctionsApplicationTypeSelectInput from "../inputs/AzureFunctionsApplicationTypeSelectInput";
import AzureFunctionsStepRegionSelectInput from "../inputs/AzureFunctionsRegionSelectInput";
import AzureFunctionsStepDynamicNameToggleInput from "../inputs/AzureFunctionsStepDynamicNameToggleInput";
import AzureExistingFunctionDeployment from "./AzureExistingFunctionDeployment";
import UseExistingFunction from "../inputs/UseExistingFunction";

function AzureFunctionsZipDeployment({ model, setModel }) {
  if (
    !model?.getData("deploymentType") ||
    model?.getData("deploymentType") === "docker"
  ) {
    return null;
  }

  const newFunction = () => {
    if (!model?.getData("existingFunctionName")) {
      return (
        <>
          <AzureFunctionsStepRegionSelectInput
            dataObject={model}
            setDataObject={setModel}
            azureToolId={model?.getData("azureToolConfigId")}
            azureApplicationId={model?.getData("azureCredentialId")}
          />
          <AzureFunctionsStepDynamicNameToggleInput
            dataObject={model}
            setDataObject={setModel}
            fieldName={"dynamicServiceName"}
          />
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
          )}
        </>
      );
    }
  };

  const existingFunction = () => {
    if (model?.getData("existingFunctionName")) {
      return (
        <AzureExistingFunctionDeployment
          model={model}
          setModel={setModel}
        />
      );
    }
  };

  return (
    <>
      <UseExistingFunction
        dataObject={model}
        setDataObject={setModel}
      />
      {existingFunction()}
      {newFunction()}
    </>
  );
}

AzureFunctionsZipDeployment.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default AzureFunctionsZipDeployment;
