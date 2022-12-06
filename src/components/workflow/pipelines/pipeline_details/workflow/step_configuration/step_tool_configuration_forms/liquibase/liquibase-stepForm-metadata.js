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
      label: "SCM Type",
      id: "service",
      isRequired: true
    },
    {
      label: "Select Account",
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
      isRequired: true
    },
    {
      label: "Repository",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
    },
    {
      label: "Branch",
      id: "gitBranch",
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
    repositoryName: "",
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
