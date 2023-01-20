import React, { useState } from "react";
import PropTypes from "prop-types";
import EnvironmentSelectInput from "../inputs/EnvironmentSelectInput";

function DeployPackageJobSubform({ model, setModel, plan, stepId }) {
  if (
    !model?.getData("jobType") ||
    model?.getData("jobType") !== "DEPLOY_PACKAGE_COMPONENT"
  ) {
    return null;
  }

  return (
    <>
      <EnvironmentSelectInput
        dataObject={model}
        setDataObject={setModel}
        disabled={model?.getData("boomiToolId")?.length === 0}
        tool={model?.getData("boomiToolId")}
      />
    </>
  );
}

DeployPackageJobSubform.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
};

export default DeployPackageJobSubform;
