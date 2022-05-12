const commandLineStepFormMetadata = {
  type: "Command Line Tool Configuration",
  fields: [
    {
      label: "Jenkins Tool",
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
      label: "Jenkins Job",
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
      label: "Select Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      // label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      id: "repoId",
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
    }
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
      label: "Select Account",
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
      id: "repoId",
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
    }
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
    useTerraformOutput : false,
    sonarScanFlag: false,
    saveSonarParameters: false,
    sonarCustomParameters: [],
    sonarToolConfigId: "",
    projectKey: "",
  }
};

export default commandLineStepFormMetadata;
