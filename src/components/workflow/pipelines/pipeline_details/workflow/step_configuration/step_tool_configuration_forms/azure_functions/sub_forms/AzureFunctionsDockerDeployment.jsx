import React, { useState } from "react";
import PropTypes from "prop-types";
import AzureFunctionsStepDockerStepSelectInput from "../inputs/AzureFunctionsStepDockerStepSelectInput";
import AzureFunctionsStepRegionSelectInput from "../inputs/AzureFunctionsRegionSelectInput";
import AzureFunctionsStepDynamicNameToggleInput from "../inputs/AzureFunctionsStepDynamicNameToggleInput";

function AzureFunctionsDockerDeployment({ model, setModel, plan, stepId }) {
  if (
    !model?.getData("deploymentType") ||
    model?.getData("deploymentType") === "zip"
  ) {
    return null;
  }

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
      <AzureFunctionsStepDockerStepSelectInput
        dataObject={model}
        setDataObject={setModel}
        plan={plan}
        stepId={stepId}
      />
    </>
  );
}

AzureFunctionsDockerDeployment.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default AzureFunctionsDockerDeployment;
