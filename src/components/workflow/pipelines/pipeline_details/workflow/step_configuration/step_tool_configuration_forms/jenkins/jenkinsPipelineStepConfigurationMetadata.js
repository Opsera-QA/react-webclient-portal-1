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
      isRequired: true,
      formText:"An Orphan branch will be created with only the back up specific files."
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
      regexValidator:RegExp("^[ a-z0-9_.-]*$"),
      formText:"Accepts aplhanumeric, lowercase without spaces. only - . (dot) and _ are allowed"
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      isRequired: true,
      regexValidator:RegExp("^[ a-z0-9_.-]*$"),
      formText:"Accepts aplhanumeric, lowercase without spaces. only - . (dot) and _ are allowed"
    },
    {
      label: "Docker File Path",
      id: "dockerPath",
      isRequired: false
    },
    {
      label: "Build Arguments",
      id: "buildArgs",
      formText:"Enter runtime build arguments as a JSON Object",
      isRequired: false
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
      isRequired: false
    },
    {
      label:"Job Type",
      id: "jenkinsJobType",
      isRequired: true
    },
    {	
      label:"Output File Name",	
      id:"outputFileName"	,
      isRequired: false
    },	
    {	
      label:"Output File Path",	
      id:"outputPath",
      isRequired: false
    },	
    {	
      label:"Script File Name",	
      id:"inputFileName",
      formText:"File name with extension is expected.",
      isRequired: false
    },	
    {	
      label:"Script File Path",	
      id:"inputFilePath",
      isRequired: false
    },
    {	
      label: "Docker Secrets",	
      id: "dockerSecrets",
      isRequired: false
    },
    {
      label: "Want to use a Custom Script",
      id: "customScript",
      isRequired: false
    },
    {
      label: "Input Details",
      id: "inputDetails",
      isRequired: false
    },
    {
      label: "Commands",
      id: "commands",
      isRequired: false
    },
    
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
    hasUpstreamBranch:false,
    workspaceDeleteFlag:false,
  }
};

export default jenkinsPipelineStepConfigurationMetadata;