const jenkinsPipelineStepConfigurationMetadata = {
  type: "Jenkins Pipeline Step Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Job Name",
      id: "jobName",
      isRequired: true
    },
    {
      label: "Tool Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    {
      label: "Branch",
      id: "branch",
      isRequired: true
    },
    {
      label: "Rollback Branch Name",
      id: "rollbackBranchName",
      isRequired: true
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Build/Xml Step Info",
      id: "stepIdXML",
      isRequired: true
    },
    {
      label: "Docker Name",
      id: "dockerName",
      isRequired: true,
      regexValidator:RegExp("^[ a-z0-9_.-]*$")
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      isRequired: true,
      regexValidator:RegExp("^[ a-z0-9_.-]*$")
    },
    {
      label: "Docker File Path",
      id: "dockerPath",
    },
    {
      label: "Build Arguments",
      id: "buildArgs",
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
    },
    {
      label:"Job Type",
      id: "jenkinsJobType",
      isRequired: true
    },
    {	
      label:"Output File Name",	
      id:"outputFileName"	
    },	
    {	
      label:"Output File Path",	
      id:"outputPath"	
    },	
    {	
      label:"Script File Name",	
      id:"inputFileName"	
    },	
    {	
      label:"Script File Path",	
      id:"inputFilePath"	
    },
    {	
      label: "Docker Secrets",	
      id: "dockerSecrets"	
    },
    {
      label: "Want to use a Custom Script",
      id: "customScript"
    },
    {
      label: "Input Details",
      id: "inputDetails"
    },
    {
      label: "Commands",
      id: "commands"
    }
  ],
  newModelBase: {
    jobType: "",
    jenkinsJobType:"",
    toolConfigId: "",
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    rollbackBranchName: "",
    stepIdXML: "",
    sfdcDestToolId: "",
    destAccountUsername: "",
    sfdcToolId: "",
    accountUsername: "",
    projectId: "",
    defaultBranch: "",
    dockerName: "",
    dockerTagName: "",
    dockerPath: "",
    buildType: "gradle", //hardcoded now but needs to get it from a dropdown
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    gitUserName: "",
    repository: "",
    branch: "",
    buildArgs: {},
    isOrgToOrg: false,
    isFullBackup: false,
    sfdcUnitTestType: "",
    workspace: "",
    agentLabels:"",
    isNewBranch:false,
    isManualRollBackBranch:false,
    hasUpstreamBranch:false
  }
};

export default jenkinsPipelineStepConfigurationMetadata;