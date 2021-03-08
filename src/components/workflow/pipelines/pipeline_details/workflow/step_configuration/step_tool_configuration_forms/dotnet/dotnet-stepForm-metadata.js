const dotnetStepFormMetadata = {
  type: "DotNet Tool Configuration",
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
      label: "Jenkins Job Id",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Jenkins Job Type",
      id: "toolJobType",
      // isRequired: true
    },
    {
      label: "Step Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Select SCM Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "SCM Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      label : "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    
    {
      label: "SCM Type",
      id: "service",
      isRequired: true
    },
    
    {
      label: "Project ID",
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
      label: "Branch",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
      // isRequired: true
    },
    {
      label: "Job Name",
      id: "jobName"
    },
    {
      label: "Build Tool",
      id: "buildTool"
    },
    {
      label: "Build Type",
      id: "buildType"
    },
    {
      label: "Build Tool Version",
      id: "buildToolVersion"
    },
    {
      label: "Docker Name",
      id: "dockerName"
    },
    {
      label: "Docker Tag Name",
      id: "dockerTagName"
    },
    {
      label: "Docker File Path",
      id: "dockerPath"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      label: "Output File Path",
      id: "outputPath",
    },
    {
      label: "Output File Name",
      id: "outputFileName",
    },
    {
      label: "Solution File Path",
      id: "solutionFilePath",
    },
    {
      label: "Solution File Name",
      id: "solutionFileName",
    },
    {
      label: "Command Line Arguments",
      id: "commandLineArgs"
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
    buildTool:"",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    dockerName: "",
    dockerTagName: "",
    dockerPath:"",

    gitCredential: "",  // name given on jenkins

    workspace: "",
    repository: "",
    gitBranch: "",

    agentLabels: "",
    workspaceName: "",
    workspaceDeleteFlag: "",
    outputPath: "",
    outputFileName: "",
    solutionFilePath: "",
    solutionFileName: "",
    commandLineArgs: ""
  }
};

export default dotnetStepFormMetadata;