import regexHelpers from "utils/regexHelpers";

const branchToBranchGitTaskConfigurationMetadata = {
  type: "Branch to Branch Git Task Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true,
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },  
    {
      label: "Auto Scaling",
      id: "autoScaleEnable"
    },
    {
      label: "Agent Label",
      id: "agentLabels",
      regexValidator: regexHelpers.regexTypes.generalTextWithoutSpacesPeriod,
      maxLength: 50
    },  
    {
      label: "Jenkins Job Name",
      id: "jobName",
      maxLength: 100,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "SCM Type",
      id: "service",
      isRequired: true,
      maxLength: 10,
      regexValidator: regexHelpers.regexTypes.loweCaseLetters
    },    
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true,
      maxLength: 50,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      id: "gitToolId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },        
    {
      id: "projectId",
      maxLength: 20,
      regexValidator: regexHelpers.regexTypes.generalText
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
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    
    {
      label: "Workspace",
      id: "workspace",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Source Branch",
      id: "sourceBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
    },
    {
      label: "Target Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpaces
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
      id: "reviewersList"
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
    reviewersList: []
    }
};

export default branchToBranchGitTaskConfigurationMetadata;