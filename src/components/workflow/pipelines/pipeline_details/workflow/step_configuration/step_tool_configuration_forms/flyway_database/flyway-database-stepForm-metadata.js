import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const flywayDatabaseStepFormMetadata = {
  type: "Flyway Tool Configuration",
  fields: [
    {
      label: "Step Type",
      id: "type",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    }, 
    {
      label: "Flyway Database",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },    
    {
      label: "Source Code Management Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
    },    
    {
      label: "Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    }, 
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      isRequired: true,
      maxLength: 255,
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
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
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
      formText: "database"
    }, 
    {
      label: "Warehouse",
      id: "warehouse",
      regexDefinitionName: "generalText",
      maxLength: 50,
      formText: "Snowflake Warehouse"
    },
    {
      label: "Allow Out of Order deployment",
      id: "outOfOrder",
      formText: " "
    },
    {
      label: "Informatica DB",
      id: "dbType",
      formText: " ",
      isRequired: true,
      maxLength: 255,
    }
  ],
  newObjectFields: {
    type: "",
    toolConfigId : "",
    dbType: "snowflake",
    service: "",
    gitToolId : "",
    repository: "",
    repoId: "",
    workspace: "",
    gitBranch: "",
    outOfOrder: false,
    baseSchema: "",
    schema: [],
    scriptFilePath: "",
    database: "", // snowflake specific - this can be separated out 
    warehouse: "" // snowflake specific - this can be separated out 
  }
};

export default flywayDatabaseStepFormMetadata;
