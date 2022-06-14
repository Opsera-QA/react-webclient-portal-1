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
      label: "Deployment Type",
      id: "deploymentType",
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
      regexDefinitionName: "azureFunctionsLabel",
    },
    {
      label: "Generate Dynamic Service Name?",
      id: "dynamicServiceName",
    },
    {
      label: "Resource Group",
      id: "resourceGroupName",
    },
    {
      label: "Specify Resource Group?",
      id: "useCustomResourceGroup"
    },
    {
      label: "Use Existing Azure Function?",
      id: "existingFunctionName"
    },
    {
      label: "Azure Function",
      id: "azureFunctionName"
    },
  ],
  newObjectFields: {
    azureToolConfigId : "",
    azureCredentialId : "",
    artifactToolId : "",
    artifactStepId : "",
    namePretext: "",
    dynamicServiceName: false,
    resourceGroupName: "",
    useCustomResourceGroup: false,
    deploymentType: "",
    applicationType: "",
    existingFunctionName: false,
    azureFunctionName: ""
  }
};

export default azureFunctionsStepFormMetadata;