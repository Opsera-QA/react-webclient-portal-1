const sfdcConnectionMetadata = {
  type: "SFDC Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Domain URL",
      id: "toolURL",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "SFDC Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "SFDC Client ID",
      id: "sfdc_client_id",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "SFDC Client Secret",
      id: "sfdc_client_secret",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "SFDC Token",
      id: "sfdc_token",
      maxLength: 256
    },
    {
      label: "Password",
      id: "sfdc_password",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Build Type",
      id: "buildType",
      regexDefinitionName: "generalTextWithoutSpacesPeriod",
      maxLength: 10
    },
    {
      label: "Check Connection for SFDX",
      id: "checkConnection"
    },
    {
      label: "Jenkins Tool",
      id: "jenkinsToolId",
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },
  ],
  newObjectFields:
    {
      toolURL: "https://login.salesforce.com",
      accountUsername : "",
      sfdc_client_id: "",
      sfdc_client_secret: "",
      sfdc_token: "",
      sfdc_password: "",
      buildType: "ant",
      checkConnection: false,
      jenkinsToolId: ""
    }
};

export default sfdcConnectionMetadata;