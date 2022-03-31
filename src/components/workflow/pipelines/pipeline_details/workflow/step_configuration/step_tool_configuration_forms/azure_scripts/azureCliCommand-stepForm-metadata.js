const azureCliCommandStepFormMetadata = {
  type: "Azure Scripts Configuration",
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
      label: "Commands",
      id: "inlineCommand",
    },
    {
      label: "Script Type",
      id: "type",
    },
    {
      label: "File Path",
      id: "filePath"
    },
    {
      label: "File Name",
      id: "fileName",
      formText: "File name with extension is expected.",
    },
    {
      label: "Bash Script",
      id: "bashScript"
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
    applicationType: ""
  }
};

export default azureCliCommandStepFormMetadata;