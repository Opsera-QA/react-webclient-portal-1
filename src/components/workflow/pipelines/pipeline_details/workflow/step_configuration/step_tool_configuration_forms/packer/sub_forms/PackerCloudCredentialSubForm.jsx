import React from "react";
import PropTypes from "prop-types";
import PackerAwsCredentialsSelectInput from "../inputs/aws/PackerAwsCredentialsSelectInput";
import PackerIAmRoleFlagToggleInput from "../inputs/aws/PackerIAmRoleFlagToggleInput";
import PackerIamRolesSelectInput from "../inputs/aws/PackerIamRolesSelectInput";
import PackerAzureToolSelectInput from "../inputs/azure/PackerAzureToolSelectInput";
import PackerAzureApplicationSelectInput from "../inputs/azure/PackerAzureApplicationSelectInput";
import PackerGcpToolSelectInput from "../inputs/gcp/PackerGcpToolSelectInput";

function PackerCloudCredentialSubForm({ model, setModel, cloudProvider}) {

  const getIamRoleFields = () => {
    if (model?.getData('iamRoleFlag') === true) {
      return (
        <PackerIamRolesSelectInput
          model={model}
          setModel={setModel}
          disabled={model?.getData("awsToolConfigId").length === 0}
          toolConfigId={model?.getData("awsToolConfigId")}
        />
      );
    }
  };

  const getCloudCredentialFields = () => {
    switch (cloudProvider) {
    case "aws":
      return (
        <>
          <PackerAwsCredentialsSelectInput model={model} setModel={setModel} />
          <PackerIAmRoleFlagToggleInput model={model} setModel={setModel} />
          {getIamRoleFields()}      
        </>
      );        
    case "azure":        
      return (
        <>
          <PackerAzureToolSelectInput model={model} setModel={setModel} />
          <PackerAzureApplicationSelectInput model={model} setModel={setModel} />
        </>
      );
    case "gcp":
      return (
        <PackerGcpToolSelectInput model={model} setModel={setModel} />
      );
    default:
      return;
    }

  };

  if (model?.getData("cloudProvider") == null || model?.getData("cloudProvider") == undefined) {
    return null;
  }

  return (
    <>
      {getCloudCredentialFields()}
    </>    
  );
}

PackerCloudCredentialSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  cloudProvider: PropTypes.string,
};

export default PackerCloudCredentialSubForm;
