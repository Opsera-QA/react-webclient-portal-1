const azureZipDeploymentMetadata = {
  type: "Azure Functions Configuration",
  fields: [
    {
      label: "Azure Tool",
      id: "azureToolId",
      isRequired: true,
    },
    {
      label: "Step ID",
      id: "stepId",
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequired: true,
    },
    {
      label: "Azure Storage Account",
      id: "azureStorageAccountName",
      isRequired: true,
    },
  ],
  newObjectFields: {
    azureToolId : "",
    azureCredentialId : "",
    azureStorageAccountName : "",
  }
};

export default azureZipDeploymentMetadata;