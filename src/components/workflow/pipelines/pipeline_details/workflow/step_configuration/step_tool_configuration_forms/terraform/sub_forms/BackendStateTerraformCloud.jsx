import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformCloudToolSelectInput from "../inputs/terraform_cloud/TerraformCloudToolSelectInput";
import TerraformCloudOrganizationsSelectInput from "../inputs/terraform_cloud/TerraformCloudOrganizationsSelectInput";
import TerraformCloudWorkspaceSelectInput from "../inputs/terraform_cloud/TerraformCloudWorkspaceSelectInput";

function BackendStateAzure({ model, setModel }) {

  const getTerraformSelectInput = () => {
    if (model?.getData("backendState") === "TERRAFORM_ENTERPRISE") {
      return (<TerraformEnterpriseToolSelectInput model={model} setModel={setModel} />);
    }
    return (<TerraformCloudToolSelectInput model={model} setModel={setModel} />);    
  };

  if (!model?.getData("backendState") || (model?.getData("backendState") !== "TERRAFORM_CLOUD" && model?.getData("backendState") !== "TERRAFORM_ENTERPRISE" )) {
    return null;
  }

  return (
    <>
      {getTerraformSelectInput()}
      <TerraformCloudOrganizationsSelectInput dataObject={model} setDataObject={setModel} disabled={model?.getData("terraformCloudId")?.length === 0} toolId={model?.getData("terraformCloudId")} />
      <TerraformCloudWorkspaceSelectInput dataObject={model} setDataObject={setModel} disabled={model?.getData("organizationName")?.length === 0} toolId={model?.getData("terraformCloudId")} />
    </>
  );
}

BackendStateAzure.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default BackendStateAzure;
