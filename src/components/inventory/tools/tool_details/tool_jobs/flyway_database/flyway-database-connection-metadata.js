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
    }
  ],
  newObjectFields:
    {
      userName: "",
      password: "",
      dbURL: "",
      port: "",
      buildType: "snowflake"
    }
};

export default FlywayDatabaseConnectionMetadata;
