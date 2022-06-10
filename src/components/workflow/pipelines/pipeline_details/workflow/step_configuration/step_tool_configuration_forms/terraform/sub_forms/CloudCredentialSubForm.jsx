import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformAwsCredentialsSelectInput from "../inputs/aws/TerraformAwsCredentialsSelectInput";
import TerraformIAmRoleFlagToggleInput from "../inputs/aws/TerraformIAmRoleFlagToggleInput";
import TerraformRuntimeArgsInput from "../inputs/TerraformRuntimeArgsInput";
import TerraformIamRolesSelectInput from "../inputs/aws/TerraformIamRolesSelectInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import CloudProviderAzureToolSelect from "../inputs/azure/CloudProviderAzureToolSelect";
import CloudProviderAzureApplicationSelect from "../inputs/azure/CloudProviderAzureApplicationSelect";

function CloudCredentialSubForm({ model, setModel}) {

  const getIamRoleFields = () => {
    if (model?.getData('iamRoleFlag') === true) {
      return (
        <TerraformIamRolesSelectInput
          model={model}
          setModel={setModel}
          disabled={model?.getData("awsToolConfigId").length === 0}
          toolConfigId={model?.getData("awsToolConfigId")}
        />
      );
    }

    if (!model?.getData('customScript'))
      {
      return (
        <>
          <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"accessKeyParamName"} />
          <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"secretKeyParamName"} />
          <TextInputBase dataObject={model} setDataObject={setModel} fieldName={"regionParamName"} />
        </>
      );
    }
  };

    const getAWSFields = () => {
        if (model?.getData('cloudProvider') === "aws") {
            return (
                <>
                    <TerraformAwsCredentialsSelectInput model={model} setModel={setModel} />
                    <TerraformIAmRoleFlagToggleInput model={model} setModel={setModel} />
                    {getIamRoleFields()}
                </>
            );
        }
    };

    const getAzureFields = () => {
        if (model?.getData('cloudProvider') === "azure") {
            return (
                <>
                    <CloudProviderAzureToolSelect model={model} setModel={setModel}/>
                    <CloudProviderAzureApplicationSelect model={model} setModel={setModel}/>
                </>
            );
        }
    };

  return (
    <>
      {getAWSFields()} {getAzureFields()}
      <TerraformRuntimeArgsInput dataObject={model} setDataObject={setModel} />
    </>
  );
}

CloudCredentialSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default CloudCredentialSubForm;
