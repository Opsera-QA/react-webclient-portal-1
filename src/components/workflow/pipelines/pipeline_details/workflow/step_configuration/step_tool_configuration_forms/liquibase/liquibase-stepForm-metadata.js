import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const LiquibaseStepFormMetadata = {
  type: "Liquibase Step Configuration",
  fields: [
    {
      label: "Step Type",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Liquibase Database",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Database",
      id: "database",
      maxLength: 128,
      regexDefinitionName: "generalText",
    },
    {
      label: "Warehouse",
      id: "warehouse",
      maxLength: 128,
      regexDefinitionName: "generalText",
    },
    {
      label: "Source Code Management Type",
      id: "service",
      isRequired: true
    },
    {
      label: "Source Code Management Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Repository",
      id: "gitRepository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
    },    
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    {
      id: "sshUrl"
    },
    {
      id: "gitUrl"
    },
    {
      label: "Changelog File",
      id: "scriptFilePath",
      maxLength: 2048,
      regexDefinitionName: "pathField",
    },
    {
      label: "Liquibase Schema",
      id: "baseSchema",
      maxLength: 256,
      regexDefinitionName: "generalText",
    },
    {
      id: "dbType",
    },
    {
      label: "Rollback Tag",
      id: "tag",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "rollback";
      },
    },
  ],
  newObjectFields: {
    jobType: "",
    toolConfigId: "",    
    database: "",
    warehouse: "",
    service: "",
    gitToolId: "",
    workspace: "",
    workspaceName: "",
    gitRepository: "",    
    repoId: "",
    gitBranch: "",
    sshUrl: "",
    gitUrl: "",
    scriptFilePath: "",
    baseSchema : "",
    dbType: "snowflake",
    tag: "",
  }
};

export default LiquibaseStepFormMetadata;
