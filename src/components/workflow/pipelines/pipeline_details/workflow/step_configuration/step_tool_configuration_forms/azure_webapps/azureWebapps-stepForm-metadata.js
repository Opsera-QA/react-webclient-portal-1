const azureWebappsStepFormMetadata = {
  type: "Azure Functions Configuration",
  fields: [
    {
      label: "Deployment Type",
      id: "deploymentType",
      isRequired: true
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
      label: "Resource Group",
      id: "resourceGroupName",
      isRequired: true
    },
    {
      label: "Azure Web App",
      id: "webappName",
      isRequired: true
    },
    {
      label: "App Settings Enabled",
      id: "appSettingsEnabled"
    },
    {
      label: "App Settings",
      id: "appSettings",
      isRequiredFunction: (model) => {
        return model?.getData("appSettingsEnabled") === true;
      },
    },
    {
      label: "Connection String Enabled",
      id: "connectionStringEnabled"
    },
    {
      label: "Connection Strings",
      id: "connectionStrings",
      isRequiredFunction: (model) => {
        return model?.getData("connectionStringEnabled") === true;
      },
    },
    {
      label: "Artifact Step",
      id: "artifactStepId",
      isRequired: true
    },
    {
      label: "Package Type",
      id: "webappPackageType",
      isRequiredFunction: (model) => {
        return model?.getData("deploymentType") === "package";
      },
    },
    {
      label: "Target Path",
      id: "webappTargetPath",
      regexDefinitionName: "pathField",
      maxLength: 1000      
    },
    {
      label: "Clean Target",
      id: "webappCleanTargetPath",      
    },
  ],
  newObjectFields: {
    deploymentType: "",
    azureToolConfigId: "",
    azureCredentialId: "",    
    resourceGroupName: "",
    webappName: "",
    appSettingsEnabled: false,
    appSettings: [],
    connectionStringEnabled: false,
    connectionStrings: [],
    artifactStepId: "",
    webappPackageType: "zip",
    webappTargetPath: "",
    webappCleanTargetPath: false,
  }
};

export default azureWebappsStepFormMetadata;
