const FlywayDatabaseConnectionMetadata = {
  type: "Flyway Databse Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Username",
      id: "userName",
      isRequired: true
    },
    {
      label: "Password",
      id: "password",
      isRequired: true
    },
    {
      label: "Database URL",
      id: "url",
      isRequired: true
    },
    {
      label: "Port",
      id: "port"
    },
    {
      label: "databaseType",
      id: "buildType",
      isRequired: true
    },
    {
      label: "Service",
      id: "service",
      isRequiredFunction: (model) => {
        return model?.getData("buildType") === "oracle";
      },
    }
  ],
  newObjectFields:
    {
      userName: "",
      password: "",
      dbURL: "",
      port: "",
      service: "",
      buildType: "snowflake"
    }
};

export default FlywayDatabaseConnectionMetadata;
