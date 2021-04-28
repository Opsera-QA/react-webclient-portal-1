const terrascanStepFormMetadata = {
  type: "Terrascan Tool Configuration",
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
      label: "Jenkins Job Name",
      id: "jobName",
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
      // isRequired: true
    },
    
    {
      label: "GIT SSH URL",
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
      label: "Dependency",
      id: "dependencyType",
      // isRequired: true
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