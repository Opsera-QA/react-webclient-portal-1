const aksStepFormMetadata = {
  type: "AKS Deploy Tool Configuration",
  fields: [
    {
      label: "Cluster Name",
      id: "aksClusterName",
      isRequired: true,
    },
    {
      label: "Service Name",
      id: "aksServiceName",
      regexDefinitionName: "azureLabels",
      maxLength: 63
    },
    {
      label: "Image Hub",
      id: "aksImageHub"
    },
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
      label: "Registry Tool",
      id: "aksRegistryType",
    },
    {
      label: "Host URL",
      id: "aksHostURL",
    },
    {
      label: "Service Port",
      id: "aksServicePort",
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
      label: "Dynamic Name Prefix",
      id: "namePretext",
      formText: "Enter a prefix to be prepended to the uniquely generated name",
      maxLength: 60,
      regexDefinitionName: "azureLabels"
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
  ],
  newObjectFields: {
    aksClusterName : "",
    aksServiceName : "",
    aksImageHub : "private",
    azureToolConfigId : "",
    azureCredentialId : "",
    aksRegistryType : "acr",
    aksHostURL : "",
    aksServicePort : "",
    artifactToolId : "",
    artifactStepId : "",
    namePretext: "",
    dynamicServiceName: false,
    resourceGroupName : "",
    useCustomResourceGroup: false
  }
};

export default aksStepFormMetadata;