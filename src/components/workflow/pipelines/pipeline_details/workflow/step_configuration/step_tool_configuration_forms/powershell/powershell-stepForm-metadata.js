const powershellStepFormMetadata = {
  type: "Powershell Tool Configuration",
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
      label: "Jenkins Job",
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
      label: "Source Control Management Account",
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
      label: "Script File Path",
      id: "scriptFilePath",
    },
    {
      label: "Script File Name",
      id: "scriptFileName"
    },
    {
      label: "Output File Path",
      id: "outputPath",
      // isRequired: true
    },
    {
      label: "Output File Name",
      id: "outputFileName",
      formText: "File name with extension is expected.",
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
      label: "Auto-Scaling Enabled?",
      id: "autoScaleEnable"
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
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

    scriptFilePath : "",
    scriptFileName : "",
    outputPath : "",
    outputFileName : "",
    workspaceDeleteFlag: ""
  }
};

export default powershellStepFormMetadata;