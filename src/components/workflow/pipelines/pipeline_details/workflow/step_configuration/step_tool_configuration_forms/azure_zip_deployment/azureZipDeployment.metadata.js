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
    {
      label: "Build Step",
      id: "buildStepId",
      isRequired: true,
    },
  ],
  newObjectFields: {
    azureToolId : "",
    azureCredentialId : "",
    azureStorageAccountName : "",
    buildStepId: ""
  }
};

export default azureZipDeploymentMetadata;