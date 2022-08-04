const LiquibaseMetadata = {
  type: "Liquibase Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Database Type",
      id: "buildType",
      isRequired: true,
    },
    {
      label: "Database URL",
      id: "url",
      isRequired: true,
      maxLength: 2048,
      regexDefinitionName: "urlField",
    },
    {
      label: "Port",
      id: "port",
      regexDefinitionName: "portField",
      maxLength: 10,
    },
    {
      label: "Username",
      id: "accountUsername",
      isRequired: true,
      maxLength: 100
    },
    {
      label: "Password",
      id: "accountPassword",
      isRequired: true,
      maxLength: 256
    },

  ],
  newObjectFields:
  {
    buildType: "",    
    url: "",
    port: "",
    accountUsername: "",
    accountPassword: "",
  }
};

export default LiquibaseMetadata;
