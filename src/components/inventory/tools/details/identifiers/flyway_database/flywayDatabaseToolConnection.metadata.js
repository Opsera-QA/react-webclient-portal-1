export const flywayDatabaseToolConnectionMetadata = {
  type: "Flyway Database Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "userName",
      isRequired: true,
      maxLength: 2048,
    },
    {
      label: "Password",
      id: "password",
      isRequired: true,
      maxLength: 2048,
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
      label: "Database Type",
      id: "buildType",
      isRequired: true,
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
  newObjectFields: {
    userName: "",
    password: "",
    url: "",
    port: "",
    service: "",
    buildType: "snowflake",
  }
};
