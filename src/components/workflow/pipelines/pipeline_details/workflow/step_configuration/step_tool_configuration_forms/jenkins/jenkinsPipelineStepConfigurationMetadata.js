import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const jenkinsPipelineStepConfigurationMetadata = {
  type: "Jenkins Pipeline Step Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.MONGO_DB_ID,
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Job Name",
      id: "jobName",
      // isRequired: true,
      maxLength: 150,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Tool Job",
      id: "toolJobId",
      // isRequired: true
    },
    {
      label: "Account",
      id: "gitCredential",
      // isRequired: true
    },
    {
      label: "Workspace",
      id: "workspace",
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      // isRequired: true
    },
    {
      label: "Branch",
      id: "branch",
      // isRequired: true
    },
    {
      label: "Rollback Branch Name",
      id: "rollbackBranchName",
      // isRequired: true,
      formText:"An Orphan branch will be created with only the back up specific files.",
      maxLength:50,
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      // isRequired: true,
      maxLength:50,
    },
    {
      label: "Build/Xml Step Info",
      id: "stepIdXML",
      // isRequired: true
    },
    {
      label: "Docker Name",
      id: "dockerName",
      // isRequired: true,
      maxLength:256,
      // TODO: This should be the pattern but this is probably fine.
      regexValidator: RegExp("^[a-zA-Z0-9_.-]*$"),
      isLowercase: true,
      formText:"Lowercase alphanumeric characters and underscore, period, and dash are allowed"
    },
    {
      label: "Use Dynamic Docker Name",
      id: "useDockerDynamicName"
    },
    {
      label: "Docker Dynamic Name",
      id: "dockerDynamicName"
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      regexDefinitionName: "dockerName",
      maxLength: 50,
      lowercase: true,
    },
    {
      label: "Dynamic Tag",
      id: "dynamicTag"
    },
    {
      label: "Docker Dynamic Tag Type",
      id: "dockerTagType"
    },
    {
      label: "Docker Dynamic Tag",
      id: "dockerDynamicTagName",
      formText: "date, timestamp, run_count, commit_sha text can be used to make it dynamic",
      regexDefinitionName: "dockerName",
      maxLength: 50,
      lowercase: true,
    },
    {
      label: "Docker File Path",
      id: "dockerPath",
      maxLength:256,
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
      label:"Output File Name",	
      id:"outputFileName",
      formText: "File name with extension is expected.",
      maxLength:50,
    },
    {	
      label:"Output File Path",	
      id:"outputPath",
      maxLength:50,
    },
    {	
      label:"Script File Name",	
      id:"inputFileName",
      formText:"File name with extension is expected.",
      maxLength:256,
    },
    {	
      label:"Specify Script File Path",	
      id:"inputFilePath",
      maxLength:256,
    },
    {	
      label: "Docker Secrets",	
      id: "dockerSecrets",
    },
    {
      label: "Specify Script File Path",
      id: "customScript",
    },
    {
      label: "Input Details",
      id: "inputDetails",
    },
    {
      label:"Specify Salesforce Credentials",
      id:"sfdcToolId",
      // isRequired: true,
    },
    {
      label:"Unit Test Type",
      id:"sfdcUnitTestType",
      formText:"Note: TestLevel of NoTestRun cannot be used in production organizations"
    },
    {
      label:"Destination Salesforce Credentials",
      id:"sfdcDestToolId",
      // isRequired: true
    },
    {
      id:"upstreamBranch",
      label:"Specify Upstream Branch",
      // isRequired: true
    },
    {
      id:"terraformStepId",
      label:"Terraform Step"
    },
    {
      label: "Parameters",
      id: "customParameters",
      //maxItems: 15,
    },
    {
      label: "Use Terraform Output",
      id: "useTerraformOutput"
    },
    {
      label:"Configure Branch Name",
      id:"isManualRollBackBranch"
    },
    {
      label:"Jenkins Job Type",
      id:"job_type",
      // isRequired: true,
    },
    {
      label: "Dependency",
      id: "dependencyType",
      // isRequired: true
    },
    {
      id: "dependencies",
      // isRequired: true
    },
    {
      label: "Create New Backup Branch",
      id: "isNewBranch",
    },
    {
      label: "Delete Workspace Before Building",
      id: "workspaceDeleteFlag",
    },
    {
      label: "Use Upstream Branch",
      id: "hasUpstreamBranch",
      formText: `
        Configure an upstream/source branch. The files will be overwritten when pushing the artifacts. 
        If no upstream branch is configured, then the new Artifact branch is created as an Orphan branch, 
        having only the artifact files and no commit history.
      `,
    },
    {
      label: "Runtime Arguments",
      id: "runtimeArguments",
      regexDefinitionName: "argumentList",
      formText: "A newline-separated list of Runtime Arguments",
      maxLength: 500
    },
    {
      label: "MetaData Transformer Rule",
      id: "ruleIds",
      isRequiredFunction: (model) => {
        return model?.getData("jobType") === "SFDC DATA TRANSFORM";
      },
    },
    {
      label: "Use build step resource",
      id: "useBuildStepResource"
    },
    {
      label: "Build Step Info",
      id: "buildStepId",
      isRequiredFunction: (model) => {
        return model?.getData("useBuildStepResource") === true;
      },
    },
    {
      label: "Commands",
      id: "commands",        
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments. Multiple commands are supported (each line indicates a new command). Please use the parameters ${BUILD_WORKSPACE} & ${WORKSPACE} to refer the previous and current workspace respectively.",
      isRequiredFunction: (model) => {
        return model?.getData("useBuildStepResource") === true;
      },
    },
    {
      label: "Dynamic Parameters",
      id: "environmentVariables",
      maxItems: 15
    },
    {
      label: "Enable Quick Deploy",
      id: "enableQuickDeploy",
    }
  ],
  newObjectFields: {
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
    useDockerDynamicName: false,
    dockerDynamicName: "",
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
    terraformStepId:"",
    useTerraformOutput: false,
    job_type:"",
    dynamicTag: false,
    dockerTagType:[],
    dockerDynamicTagName:"",
    runtimeArguments: "",
    dependencies: {},
    dependencyType:"",
    ruleIds: [],
    useBuildStepResource: false,
    buildStepId: "",
    commands: "",
    environmentVariables: [],
    enableQuickDeploy: false
  }
};

export default jenkinsPipelineStepConfigurationMetadata;