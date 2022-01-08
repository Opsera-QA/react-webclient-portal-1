import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformCloudToolSelectInput from "../inputs/terraform_cloud/TerraformCloudToolSelectInput";
import TerraformCloudOrganizationsSelectInput from "../inputs/terraform_cloud/TerraformCloudOrganizationsSelectInput";

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
