import React, { useState } from "react";
import PropTypes from "prop-types";
import HelmAwsCredentialsSelectInput from "../inputs/aws/HelmAwsCredentialsSelectInput";
import TextInputBase from "../../../../../../../../common/inputs/text/TextInputBase";
import CloudProviderAzureToolSelect from "../inputs/azure/CloudProviderAzureToolSelect";
import CloudProviderAzureApplicationSelect from "../inputs/azure/CloudProviderAzureApplicationSelect";
import HelmS3BucketSelectInput from "../inputs/aws/HelmS3BucketSelectInput";
import HelmS3BucketRegionSelectInput from "../inputs/aws/HelmS3BucketRegionSelectInput";
import AzureClusterTypeSelectInput from "../inputs/azure/AzureClusterTypeSelectInput";
import HelmAzureClusterSelectInput from "../inputs/azure/HelmAzureClusterSelectInput";
import AzureResourceGroupSelectInput from "../inputs/azure/AzureResourceGroupSelect";

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
                    <HelmS3BucketSelectInput model={model} setModel={setModel} />
                    <HelmS3BucketRegionSelectInput model={model} setModel={setModel} fieldName="bucketRegion" />
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
                    <AzureResourceGroupSelectInput model={model} setModel={setModel} />
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
