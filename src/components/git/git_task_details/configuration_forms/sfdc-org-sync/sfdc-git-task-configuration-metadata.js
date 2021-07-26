import regexHelpers from "utils/regexHelpers";

const sfdcGitTaskConfigurationMetadata = {
  type: "SFDC Git Task Configuration",
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
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
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
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
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
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
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
      label: "Branch",
      id: "gitBranch",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      id: "sfdcToolId",
      isRequired: true,
      maxLength: 24,
      regexValidator: regexHelpers.regexTypes.mongoId
    },
    {
      label: "SFDC Account",
      id: "sfdcToolName",
      isRequired: true,
      maxLength: 255,
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash
    },
    {
      label: "Create a new branch?",
      id: "newBranch",
      formText: "Creates a new branch and synch the changes.",
    },
    {
      label: "Use an upstream branch?",
      id: "hasUpstreamBranch",
      formText: "Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts. If no upstream branch is configured, then the new branch is created as an Orphan branch, having only the artifact files and no commit history.",
    },
    {
      label: "Upstream Branch",
      id: "upstreamBranch",
      regexValidator: regexHelpers.regexTypes.generalTextWithSpacesSlash,
      maxLength: 50
    },
  ],
  newObjectFields:
    {
    type: "",
    jobType: "SFDC_GIT_SYNC",
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
    defaultBranch: "",
    dependencyType:"",
    sfdcToolId: "",
    sfdcToolName: "",
    accountUsername: "",
    newBranch: false,
    hasUpstreamBranch: false,
    upstreamBranch: ""
    }
};

export default sfdcGitTaskConfigurationMetadata;