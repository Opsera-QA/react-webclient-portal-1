const salesforceQuickDeployTaskConfigurationMetadata = {
  type: "Salesforce Quick Deploy Task Configuration",
  fields: [
    {
      label: "Salesforce Account",
      id: "sfdcToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
    {
      label: "Salesforce Account",
      id: "sfdcToolName",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Salesforce Deploy Key",
      id: "deployKey",
      isRequired: true,
      maxLength: 20,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
  ],
  newObjectFields: {
    type: "",
    jobType: "SFDC_QUICK_DEPLOY",
    sfdcToolId: "",
    sfdcToolName: "",
    accountUsername: "",
    deployKey: ""
  }
};

export default salesforceQuickDeployTaskConfigurationMetadata;