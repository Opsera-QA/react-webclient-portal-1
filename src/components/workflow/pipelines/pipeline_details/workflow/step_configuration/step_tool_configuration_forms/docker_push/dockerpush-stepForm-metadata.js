const dockerPushStepFormMetadata = {
    type: "Command Line Tool Configuration",
    fields: [
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
        label: "Want to specifiy the path for a script file?",
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
        label: "AWS Tool",
        id: "awsToolConfigId"
      },
      {
        label: "Build Step Info",
        id: "buildStepId",
        isRequired: true
      },
      {
        label: "Want to use an existing repository?",
        id: "newRepo",
      },
      {
        label: "Select ECR Repository",
        id: "ecrRepoName",
      }
        
    ],
    newModelBase: {
  
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

      awsToolConfigId: "",
      
      agentLabels: "",
      autoScaleEnable: false,
  
      newRepo: false,
      ecrRepoName: "",

      outputPath: "",
      outputFileName: "",
      dependencies: {},
      dependencyType:"",
      buildStepId: "",
      sourceScript: false,
      inputPath: "",
      inputFileName: "",
      commands: "",
    }
  };
  
  export default dockerPushStepFormMetadata;