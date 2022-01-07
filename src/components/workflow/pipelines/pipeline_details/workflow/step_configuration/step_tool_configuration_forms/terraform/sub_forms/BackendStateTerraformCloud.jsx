import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformCloudToolSelectInput from "../inputs/TerraformCloudToolSelectInput";
import TerraformCloudOrganizationsSelectInput from "../inputs/TerraformCloudOrganizationsSelectInput";

function BackendStateAzure({ model, setModel }) {
  if (!model?.getData("backendState") || model?.getData("backendState") !== "TERRAFORM_CLOUD") {
    return null;
  }

  return (
    <>
      <TerraformCloudToolSelectInput model={model} setModel={setModel} />
      <TerraformCloudOrganizationsSelectInput model={model} setModel={setModel} />
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default BackendStateAzure;
