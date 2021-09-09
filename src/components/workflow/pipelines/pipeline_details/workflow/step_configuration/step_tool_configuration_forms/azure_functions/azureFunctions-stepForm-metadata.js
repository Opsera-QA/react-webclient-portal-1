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
      isRequired: true
    },
    {
      label: "Artifact Tool",
      id: "artifactToolId"
    },
    {
      label: "Artifact Step",
      id: "artifactStepId"
    },
    {
      label: "Service Name",
      id: "azureFunctionsServiceName",
    },
    {
      label: "Dynamic Name Prefix",
      id: "namePretext",
      formText: "Enter a prefix to be prepended to the uniquely generated name",
      maxLength: 25,
      regexValidator: /^[A-Za-z0-9-.:]*$/
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