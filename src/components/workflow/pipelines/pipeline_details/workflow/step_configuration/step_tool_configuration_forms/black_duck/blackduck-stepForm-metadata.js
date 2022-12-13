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
    },    
    {
      label: "Repository",
      id: "gitRepositoryID",
      isRequired: true
    },
    {
      label: "Branch",
      id: "defaultBranch",
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
