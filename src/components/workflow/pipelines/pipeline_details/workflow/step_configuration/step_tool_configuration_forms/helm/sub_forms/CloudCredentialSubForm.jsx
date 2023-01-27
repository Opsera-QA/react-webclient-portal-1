import React, { useState } from "react";
import PropTypes from "prop-types";
import HelmAwsCredentialsSelectInput from "../inputs/aws/HelmAwsCredentialsSelectInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import CloudProviderAzureToolSelect from "../inputs/azure/CloudProviderAzureToolSelect";
import CloudProviderAzureApplicationSelect from "../inputs/azure/CloudProviderAzureApplicationSelect";
import AzureClusterTypeSelectInput from "../inputs/azure/AzureClusterTypeSelectInput";
import HelmAzureClusterSelectInput from "../inputs/azure/HelmAzureClusterSelectInput";
import AzureResourceGroupSelectInput from "../inputs/azure/AzureResourceGroupSelect";
import HelmAwsClusterSelectInput from "../inputs/aws/HelmAwsClusterSelectInput";
import HelmAwsNamespaceSelectInput from "../inputs/aws/HelmAwsNamespaceSelectInput";
import HelmAzureNamespaceSelectInput from "../inputs/azure/HelmAzureNamespaceSelectInput";

function CloudCredentialSubForm({ model, setModel}) {

  const getFields = () => {
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
                    <HelmAwsCredentialsSelectInput model={model} setModel={setModel} />
                    <HelmAwsClusterSelectInput model={model} setModel={setModel} awsToolConfigId={model.getData("awsToolConfigId")} />
                    <HelmAwsNamespaceSelectInput model={model} setModel={setModel} awsToolConfigId={model.getData("awsToolConfigId")} clusterName={model.getData("clusterName")} />
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
                    <HelmAzureClusterSelectInput model={model} setModel={setModel} azureToolConfigId={model.getData("azureToolConfigId")} applicationId={model.getData("azureCredentialId")} />
                    <AzureClusterTypeSelectInput model={model} setModel={setModel} azureToolConfigId={model.getData("azureToolConfigId")} azureApplication={model.getData("azureCredentialId")} clusterName={model.getData("clusterName")}/>
                    <AzureResourceGroupSelectInput model={model} setModel={setModel} azureToolConfigId={model.getData("azureToolConfigId")} azureApplication={model.getData("azureCredentialId")} clusterName={model.getData("clusterName")} />
                    <HelmAzureNamespaceSelectInput model={model} setModel={setModel} azureToolConfigId={model.getData("azureToolConfigId")} azureCredentialId={model.getData("azureCredentialId")} clusterName={model.getData("clusterName")} clusterType={model.getData("clusterType")} resourceGroup={model.getData("resourceGroup")} /> 
                </>
            );
        }
    };

  return (
    <>
      {getAWSFields()} 
      {getAzureFields()}
    </>
  );
}

CloudCredentialSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func
};

export default CloudCredentialSubForm;
