import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

const commandLineStepFormMetadata = {
  type: "Command Line Tool Configuration",
  fields: [
    {
      label: "Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Tool Name",
      id: "toolName",
      isRequired: true
    },
    {
      label: "Job Name",
      id: "toolJobName",
      isRequired: true
    },
    {
      // label: "Jenkins Job Name",
      id: "jobName",
    },
    {
      label: "Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      // label: "Jenkins Job Type",
      id: "toolJobType",
      // isRequired: true
    },
    {
      // label: "Step Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "SCM Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      // label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
      isRequired: true
    },
    
    {
      // label: "Type of GIT Service",
      id: "service",
      isRequired: true
    },
    
    {
      id: "projectId",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_ID,
    },
    {
      id: "gitUrl",
      // isRequired: true
    },
    
    {
      id: "sshUrl",
      // isRequired: true
    },
    
    {
      label: "Repository",
      id: "repository",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.REPOSITORY_NAME,
      isRequired: true
    },
    
    {
      label: "Workspace",
      id: "workspace",
      // isRequired: true
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },

    {
      label: "Branch",
      id: "gitBranch",
      dynamicSettingType: metadataConstants.SUPPORTED_DYNAMIC_SETTING_TYPES.PRIMARY_BRANCH,
      isRequired: true
    },
    
    {
      label: "Specify Script File Path",
      id: "sourceScript",
    },
    {
      label: "Commands",
      id: "commands",
      isRequired: true,
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments. Multiple commands are supported (each line indicates a new command)"
    },
    {
      label: "Dependency",
      id: "dependencyType",
      // isRequired: true
    },
    {
      label: "Script File Path",
      id: "scriptFilePath",
      // isRequired: true
    },
    {
      label: "Script File Name",
      id: "scriptFileName",
      formText: "File name with extension is expected."
      // isRequired: true
    },
    {
      label: "Output Path",
      id: "outputPath",
      // isRequired: true
    },
    {
      label: "Output File Name",
      id: "outputFileName",
      formText: "File name with extension is expected."
      // isRequired: true
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      id: "dependencies",
      // isRequired: true
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
      // isRequired: true
    },
    {
      label: "Auto-Scaling Enabled?",
      id: "autoScaleEnable"
    },
    {
      label: "Terraform Step",
      id: "terraformStepId"
    },
    {
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Output Parameters",
      id: "outputCustomParameters",
      maxItems: 15,
    },
    {
      label: "Local Input Parameters",
      id: "stepParameters",
      maxItems: 15,
    },
    {
      label: "Use Terraform Output",
      id: "useTerraformOutput"
    },
    {
      label: "Sonar Scan",
      id: "sonarScanFlag"
    },
    {
      label: "Sonar Custom Parameters Mapping",
      id: "saveSonarParameters"
    },
    {
      label: "Sonar Parameters",
      id: "sonarCustomParameters",
      maxItems: 15,
    },
    {
      label: "Sonar Tool",
      id: "sonarToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("sonarScanFlag") === true;
      },
    },
    {
      label: "Project Key",
      id: "projectKey",
      maxLength: 150,
      spacesAllowed: false,
      isRequiredFunction: (model) => {
        return model?.getData("sonarScanFlag") === true;
      },
    },
    {
      label: "Input Parameters with Variable Mapping",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Dynamic Parameters",
      id: "environmentVariables",
      maxItems: 15,
      isRequiredFunction: (model) => {
        return model?.getData("saveEnvironmentVariables") === true;
      },
    },
  ],
  fieldsAlt: [
    {
      label: "Select Jenkins Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Jenkins Tool Name",
      id: "toolName",
      isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
      isRequired: true
    },
    
    {
      // label: "Jenkins Job Name",
      id: "jobName",
    },
    {
      // label: "Jenkins Job Id",
      id: "toolJobId",
      isRequired: true
    },
    {
      // label: "Jenkins Job Type",
      id: "toolJobType",
      // isRequired: true
    },
    {
      // label: "Step Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Select SCM Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      // label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true
    },
    
    {
      // label: "Type of GIT Service",
      id: "service",
      isRequired: true
    },
    
    {
      id: "projectId",
    },
    {
      id: "gitUrl",
      // isRequired: true
    },
    
    {
      id: "sshUrl",
      // isRequired: true
    },
    
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    
    {
      label: "Workspace",
      id: "workspace",
      // isRequired: true
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },

    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true
    },
    
    {
      label: "Want to specify the path for a script file?",
      id: "sourceScript",
    },
    {
      label: "Commands",
      id: "commands",
      // isRequired: true,
      formText: "A platform-specific script, which will be executed as .cmd file on Windows or as a shellscript in Unix-like environments. Multiple commands are supported (each line indicates a new command)"
    },
    {
      label: "Dependency",
      id: "dependencyType",
      // isRequired: true
    },
    {
      label: "Script File Path",
      id: "scriptFilePath",
      // isRequired: true
    },
    {
      label: "Script File Name",
      id: "scriptFileName",
      formText: "File name with extension is expected.",
      isRequired: true
    },
    {
      label: "Output Path",
      id: "outputPath",
      // isRequired: true
    },
    {
      label: "Output File Name",
      id: "outputFileName",
      formText: "File name with extension is expected."
      // isRequired: true
    },

    {
      id: "dependencies",
      // isRequired: true
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
      // isRequired: true
    },
    {
      label: "Auto-Scaling Enabled?",
      id: "autoScaleEnable"
    },
    {
      label: "Terraform Step",
      id: "terraformStepId"
    },
    {
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Output Parameters",
      id: "outputCustomParameters",
      maxItems: 15,
    },
    {
      label: "Use Terraform Output",
      id: "useTerraformOutput"
    },    
    {
      label: "Sonar Scan",
      id: "sonarScanFlag"
    }, 
    {
      label: "Sonar Custom Params Mapping",
      id: "saveSonarParameters"
    },
    {
      label: "Sonar Parameters",
      id: "sonarCustomParameters",
      maxItems: 15,
    },
    {
      label: "Local Input Parameters",
      id: "stepParameters",
      maxItems: 15,
    },
    {
      label: "Sonar Tool Id",
      id: "sonarToolConfigId",
      isRequiredFunction: (model) => {
        return model?.getData("sonarScanFlag") === true;
      },
    },
    {
      label: "Project Key",
      id: "projectKey",
      maxLength: 150,
      spacesAllowed: false,
      isRequiredFunction: (model) => {
        return model?.getData("sonarScanFlag") === true;
      },
    },
    {
      label: "Save Dynamic Parameters",
      id: "saveEnvironmentVariables"
    },
    {
      label: "Dynamic Parameters",
      id: "environmentVariables",
      maxItems: 15,
      isRequiredFunction: (model) => {
        return model?.getData("saveEnvironmentVariables") === true;
      },
    },
  ],
  newObjectFields: {

    type: "",

    jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
    toolConfigId: "",
    toolName: "",
    jobName: "",

    toolJobId: "",
     
    projectId: "",
  
    buildType: "", //hardcoded now but needs to get it from a dropdown
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",

    gitCredential: "",  // name given on jenkins

    workspace: "",
    workspaceName: "",
    repository: "",
    gitBranch: "",

    agentLabels: "",
    autoScaleEnable: false,

    outputPath: "",
    outputFileName: "",
    dependencies: {},
    dependencyType:"",
    workspaceDeleteFlag: false,

    sourceScript: false,
    inputPath: "",
    inputFileName: "",
    commands: "",
    terraformStepId: "",
    customParameters: [],
    outputCustomParameters: [],
    stepParameters: [],
    useTerraformOutput : false,
    sonarScanFlag: false,
    saveSonarParameters: false,
    sonarCustomParameters: [],
    sonarToolConfigId: "",
    projectKey: "",
    saveEnvironmentVariables: false,
    environmentVariables: [],
  }
};

export default commandLineStepFormMetadata;
