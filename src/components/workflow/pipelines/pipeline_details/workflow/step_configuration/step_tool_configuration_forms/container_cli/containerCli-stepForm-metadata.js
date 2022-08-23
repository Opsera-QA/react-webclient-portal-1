const containerCliStepFormMetadata = {
  type: "Container CLI Step Configuration",
  fields: [
    {
      label: "Registry",
      id: "registry",
    },
    {
      label: "Use SCM",
      id: "useScm",
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
      id: "dependencies",
      // isRequired: true
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
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true
    },    
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true
    },
    {
      label: "Branch",
      id: "defaultBranch", 
      isRequired: true
    },
    {
      label: "Git File Path",
      id: "gitFilePath",      
    },    
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
  ],
  newObjectFields: {
    outputPath: "",
    outputFileName: "",
    dependencies: {},
    dependencyType: "",
    sourceScript: false,
    commands: "",
    terraformStepId: "",
    customParameters: [],
    outputCustomParameters: [],
    useTerraformOutput: false,
    sonarScanFlag: false,
    saveSonarParameters: false,
    sonarCustomParameters: [],
    sonarToolConfigId: "",
    projectKey: "",
    saveEnvironmentVariables: false,
    environmentVariables: [],
    gitRepository: "",
    defaultBranch: "",
    type:"",
    gitToolId : "",
    gitRepositoryID: "",
    sshUrl:"",
    gitUrl:"",
    bitbucketWorkspace : "",
    bitbucketWorkspaceName: "",
  }
};

export default containerCliStepFormMetadata;
