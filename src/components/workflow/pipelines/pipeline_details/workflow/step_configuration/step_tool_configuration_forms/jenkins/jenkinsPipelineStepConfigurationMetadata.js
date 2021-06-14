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
      // TODO: This should be the pattern but this is probably fine.
      regexValidator: RegExp("^[a-zA-Z0-9_.-]*$"),
      isLowercase: true,
      formText:"Lowercase alphanumeric characters and underscore, period, and dash are allowed"
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      isRequired: true,
      regexValidator:RegExp("^[a-zA-Z0-9_.-]*$"),
      formText:"Lowercase alphanumeric characters and underscore, period, and dash are allowed"
    },
    {
      label: "Docker File Path",
      id: "dockerPath",
    },
    {
      label: "Build Arguments",
      id: "buildArgs",
      formText:"Enter runtime build arguments as a JSON Object",
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
    },
    {
      label:"Output File Name",	
      id:"outputFileName"	,
    },
    {	
      label:"Output File Path",	
      id:"outputPath",
    },
    {	
      label:"Script File Name",	
      id:"inputFileName",
      formText:"File name with extension is expected.",
    },
    {	
      label:"Specify Script File Path",	
      id:"inputFilePath",
    },
    {	
      label: "Docker Secrets",	
      id: "dockerSecrets",
    },
    {
      label: "Want to use a Custom Script",
      id: "customScript",
    },
    {
      label: "Input Details",
      id: "inputDetails",
    },
    {
      label: "Commands",
      id: "commands",
    },
    {
      label:"Specify SalesForce Credentials",
      id:"sfdcToolId",
      isRequired: true,
    },
    {
      label:"Unit Test Type",
      id:"sfdcUnitTestType",
      formText:"Note: TestLevel of NoTestRun cannot be used in production organizations"
    },
    {
      label:"Destination SalesForce Credentials",
      id:"sfdcDestToolId",
      isRequired: true
    },
    {
      id:"upstreamBranch",
      label:"Specify Upstream Branch",
      isRequired: true
    },
    {
      id:"terraformStepId",
      label:"Terraform Step"
    }
  ],
  newModelBase: {
    jobType: "",
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
    gitBranch:"",
    customParameters:[],
    terraformStepId:""
  }
};

export default jenkinsPipelineStepConfigurationMetadata;