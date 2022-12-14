import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const BlackDuckStepFormMetadata = {
  type: "BlackDuck Step Configuration",
  fields: [
    {
      label: "BlackDuck Tool",
      id: "blackDuckToolId",
      isRequired: true,
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "SCM Service",
      id: "type",
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
      id: "gitRepositoryID",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      label: "Branch",
      id: "defaultBranch",
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
      label: "Git File Path",
      id: "gitFilePath",
    },
    {
      label: "Project Name",
      id: "projectName",
      isRequired: true
    },
    {      
      id: "projectId",
    },
    {
      label: "Runtime Variables",
      id: "environmentVariables"
    },
    {
      label: "Commands",
      id: "commands",
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments. Multiple commands are supported (each line indicates a new command)"
    },
    {
      label: "Dependency",
      id: "dependencyType",
    },
    {
      id: "dependencies",
    },
  ],
  newObjectFields: {
    blackDuckToolId: "",
    gitToolId: "",    
    type: "",
    workspace: "",
    workspaceName: "",
    gitRepository: "",
    gitRepositoryID: "",
    defaultBranch: "",
    sshUrl: "",    
    gitUrl: "",
    gitFilePath: "",
    projectName: "",
    projectId: "",
    environmentVariables: [],
    commands: "",
    dependencies: {},
    dependencyType:"",
  }
};

export default BlackDuckStepFormMetadata;
