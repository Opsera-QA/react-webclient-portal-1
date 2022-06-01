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
      isRequired: true
    },    
    {
      label: "GIT Repository ID",
      id: "gitRepositoryID",
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
      isRequired: true
    },
    {
      label: "Project Name",
      id: "projectName",
      isRequired: true
    },    
    {
      label: "Tag",
      id: "tag",      
    },
    {
      label: "Use Run Count as Version",
      id: "runCountAsVersion"
    },
    {
      label: "Environments",
      id: "environments",
      formText : "Enter environments as a JSON Object"
    },
    {
      label: "Runtime Variables",
      id: "runtimeVariables"
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
    tag: "",
    runCountAsVersion: false,
    environments : {},
    runtimeVariables: [],
  }
};

export default BlackDuckStepFormMetadata;
