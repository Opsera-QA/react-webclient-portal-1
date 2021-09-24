const azureFunctionsStepFormMetadata = {
  type: "Azure Functions Configuration",
  fields: [
    {
      label: "Azure Tool",
      id: "azureToolConfigId",
      isRequired: true
    },
    {
      label: "Azure Credential",
      id: "azureCredentialId",
      isRequired: true
    },
    {
      label: "Region",
      id: "azureRegion",
      isRequired: true
    },
    {
      label: "Application Type",
      id: "applicationType",
    },
    {
      label: "Artifact Tool",
      id: "artifactToolId"
    },
    {
      label: "Artifact Step",
      id: "artifactStepId",
      formText: "Docker based function deployments will keep created resources occupied at all times unless manually destroyed by the user."
    },
    {
      label: "Service Name",
      id: "azureFunctionsServiceName",
      regexDefinitionName: "azureLabels",
      maxLength: 63
    },
    {
      label: "Dynamic Name Prefix",
      id: "namePretext",
      formText: "Enter a prefix to be prepended to the uniquely generated name",
      maxLength: 25,
      regexDefinitionName: "azureLabels"
    },
    {
      label: "Generate Dynamic Service Name?",
      id: "dynamicServiceName",
    },
  ],
  newObjectFields: {
    azureToolConfigId : "",
    azureCredentialId : "",
    artifactToolId : "",
    artifactStepId : "",
    namePretext: "",
    dynamicServiceName: false
  }
};

export default azureFunctionsStepFormMetadata;