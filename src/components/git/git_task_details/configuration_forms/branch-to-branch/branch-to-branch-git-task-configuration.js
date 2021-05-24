import regexHelpers from "utils/regexHelpers";

const branchToBranchGitTaskConfigurationMetadata = {
  type: "Branch to Branch Git Task Configuration",
  fields: [
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      regexValidator: regexHelpers.regexTypes.loweCaseLetters
    },    
    {
      id: "gitCredential",
      isRequired: true,
      maxLength: 250,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      label: "Account",
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },        
    {
      id: "projectId",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
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
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      label: "Source Branch",
      id: "sourceBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      label: "Target Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
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