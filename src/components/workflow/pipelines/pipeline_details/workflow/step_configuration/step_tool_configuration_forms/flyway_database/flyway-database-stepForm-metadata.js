const flywayDatabaseStepFormMetadata = {
  type: "Flyway Tool Configuration",
  fields: [
    {
      label: "Flyway Database",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },    
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "SCM Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    }, 
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Workspace/Project",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Base Schema",
      id: "baseSchema",
      regexDefinitionName: "generalText",
      maxLength: 50,
      formText: "The default schema managed by Flyway containing the schema history table"
    }, 
    {
      label: "Schema",
      id: "schema",
      maxLength: 50,
      formText: "list of the schemas managed by Flyway"
    }, 
    {
      label: "Scripts Location",
      id: "scriptFilePath",
      regexDefinitionName: "pathField",
      maxLength: 50,
      formText: "point to a directory containing SQL migrations, scanned recursively"
    },  
    {
      label: "Database",
      id: "database",
      regexDefinitionName: "generalText",
      maxLength: 50,
      formText: "Snowflake database"
    }, 
    {
      label: "Warehouse",
      id: "warehouse",
      regexDefinitionName: "generalText",
      maxLength: 50,
      formText: "Snowflake Warehouse"
    },
  ],
  newObjectFields: {
    toolConfigId : "",
    service: "",
    gitToolId : "",
    repository: "",
    workspace: "",
    gitBranch: "",
    baseSchema: "",
    schema: [],
    scriptFilePath: "",
    database: "", // snowflake specific - this can be separated out 
    warehouse: "" // snowflake specific - this can be separated out 
  }
};

export default flywayDatabaseStepFormMetadata;
