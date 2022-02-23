const terrascanStepFormMetadata = {
  type: "Terrascan Tool Configuration",
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
      label: "Jenkins Job Name",
      id: "jobName",
    },
    {
      label: "Jenkins Job",
      id: "toolJobId",
      isRequired: true
    },
    {
      label: "Jenkins Job Type",
      id: "toolJobType",
    },
    {
      label: "Step Job Type",
      id: "jobType",
      isRequired: true
    },
    {
      label: "Source Code Management Type",
      id: "type",
      isRequired: true
    },
    
    {
      label: "Select Account",
      id: "gitCredential",
      isRequired: true
    },
    {
      label: "Select Account",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    
    {
      label: "Type of GIT Service",
      id: "service",
      isRequired: true
    },
    
    {
      label: "Project ID",
      id: "projectId",
    },
    {
      label: "GIT URL",
      id: "gitUrl",
    },
    
    {
      label: "GIT SSH URL",
      id: "sshUrl",
    },
    
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    
    {
      label: "Workspace",
      id: "workspace",
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
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
      label: "Dependency",
      id: "dependencyType",
    },
    {
      label: "Output Path",
      id: "outputPath",
    },
    {
      label: "Output File Name",
      id: "outputFileName",
      formText: "File name with extension is expected."
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    {
      id: "dependencies",
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
    },
    {
      label: "Auto-Scaling Enabled?",
      id: "autoScaleEnable"
    },
    {
      label: "Cloud Platform",
      id: "platform"
    },
    {
      label: "Rules",
      id: "rules"
    },
    {
      label: "Terrascan Config File Path",
      id: "terrascanConfigFilePath"
    }
  ],
  newObjectFields: {
    type: "",
    jobType: "",
    toolConfigId: "",
    toolName: "",
    jobName: "",
    toolJobId: "",
    projectId: "",
    buildType: "",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
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
    platform: "",
    terrascanConfigFilePath: "",
    rules : []
  }
};

export default terrascanStepFormMetadata;