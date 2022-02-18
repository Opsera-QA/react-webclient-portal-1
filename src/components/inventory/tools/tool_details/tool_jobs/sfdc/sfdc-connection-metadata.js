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
      label: "Salesforce Login Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Salesforce Client ID (Consumer Key from Connected App)",
      id: "sfdc_client_id",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Salesforce Client Secret (Consumer Secret from Connected App)",
      id: "sfdc_client_secret",
      isRequired: true,
      maxLength: 256
    },
    {
      label: "Salesforce User Token",
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
    }
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
    }
};

export default sfdcConnectionMetadata;