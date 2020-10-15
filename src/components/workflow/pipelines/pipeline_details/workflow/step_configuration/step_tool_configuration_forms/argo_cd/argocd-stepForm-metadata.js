const ArgoCDStepFormMetadata = {
  type: "YAML Git Step Configuration",
  fields: [
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Select SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Select Repository",
      id: "gitRepository", 
      isRequired: true
    },
    {
      label: "Select Branch",
      id: "defaultBranch", 
      isRequired: true
    },
    {
      label: "Select Docker/ECR Step",
      id: "dockerStepID",
      isRequired: true
    },
    {
      label: "Commit Type",
      id: "existingContent",
    },
    {
      label: "Select Tool",
      id: "toolConfigId", 
      isRequired: true
    },
    {
      label: "Argo URL",
      id: "toolUrl", 
      isRequired: true
    },
    {
      label: "User Name",
      id: "userName", 
      isRequired: true
    },
    {
      label: "Select Application",
      id: "applicationName", 
      isRequired: true
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      isRequired: true
    },
    {
      label: "Git Workspace",
      id: "gitWorkspace",
    },
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    }
  ],
  newModelBase: {
    existingContent: "image",
    dockerStepID: "",
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    gitWorkspace: "",
    type:"",
    gitToolId : "",
    toolConfigId: "",
    toolUrl : "",
    userName: "", 
    applicationName: "",
    gitRepositoryID: ""
  }
};

export default ArgoCDStepFormMetadata;