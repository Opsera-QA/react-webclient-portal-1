import React, { useState } from "react";
import PropTypes from "prop-types";
import AzureFunctionsStepDockerStepSelectInput from "../inputs/AzureFunctionsStepDockerStepSelectInput";


function AzureFunctionsDockerDeployment({ model, setModel,plan,stepId }) {

  if (!model?.getData("deploymentType") || model?.getData("deploymentType") === "zip") {
    return null;
  }


  return (
    <>
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
