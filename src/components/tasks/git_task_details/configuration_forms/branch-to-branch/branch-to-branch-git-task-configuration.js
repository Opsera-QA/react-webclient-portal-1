const branchToBranchGitTaskConfigurationMetadata = {
  type: "Branch to Branch Git Task Configuration",
  fields: [
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      lowercase: true,
      regexValidator: "alphabetic",
    },    
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true,
      maxLength: 250,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexDefinitionName: "mongoId",
    },        
    {
      id: "projectId",
      maxLength: 100,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      id: "gitUrl",
    },
    
    {
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Source Branch",
      id: "sourceBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },
    {
      label: "Target Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexDefinitionName: "generalTextWithSpacesSlash",
    },    
    {
      label: "Auto Approve",
      id: "autoApprove"
    },
    {
      label: "Reviewers",
      id: "reviewers"
    },
    {
      label: "Reviewers",
      id: "reviewerNames"
    },
    {
      label: "Delete Source Branch",
      id: "deleteSourceBranch"
    }
  ],
  newObjectFields:
    {
    type: "",
    jobType: "GIT_GIT_SYNC",
    toolConfigId: "",
    autoScaleEnable: false,
    toolName: "",
    jobName: "",
    agentLabels: "",
    toolJobId: "",
    projectId: "",
    buildType: "ant",
    gitToolId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",
    sourceBranch: "",
    defaultBranch: "",
    dependencyType:"",    
    accountUsername: "",
    autoApprove: false,
    reviewers: [],
    reviewerNames: [],
    deleteSourceBranch: true
    }
};

export default branchToBranchGitTaskConfigurationMetadata;