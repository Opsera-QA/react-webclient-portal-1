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
    {
      label: "Service",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("buildType") === "oracle";
      },
      maxLength: 200,
    },
  ],
  newObjectFields:
  {
    buildType: "",    
    url: "",
    port: "",
    accountUsername: "",
    accountPassword: "",
    service: "",
  }
};

export default LiquibaseMetadata;
