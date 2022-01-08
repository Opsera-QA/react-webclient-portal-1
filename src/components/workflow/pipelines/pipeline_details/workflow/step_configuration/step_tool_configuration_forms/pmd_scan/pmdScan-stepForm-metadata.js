const pmdScanStepFormMetadata = {
  type: "PMD Tool Configuration",
  fields: [
    {
      label: "Step Tool",
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
      // isRequired: true
    },
    {
      label: "Jenkins Job",
      id: "toolJobName",
      isRequired: true
    },
    {
      label: "Job",
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
      // isRequired: true
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Quality Gate",
      id: "qualityGate",
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
    },
    
    {
      label: "Best Practice Threshold",
      id: "bestPracticeThreshold",
    },
    {
      label: "Code Style Threshold",
      id: "codeStyleThreshold",
    },
    
    {
      label: "Design Threshold",
      id: "designThreshold",
    },
    {
      label: "Error Prone Threshold",
      id: "errorProneThreshold",
    },
    {
      label: "Security Threshold",
      id: "securityThreshold",
    },
  ],
  newObjectFields: {
    jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
    toolConfigId: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    projectId: "",
    gitBranch: "",
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    gitUserName: "",
    repository: "",
    branch: "",
    workspace: "",
    qualityGate: [],
    bestPracticeThreshold: [],
    codeStyleThreshold: [],
    designThreshold: [],
    errorProneThreshold: [],
    securityThreshold: [],
    
    workspaceDeleteFlag: false
  }
};

export default pmdScanStepFormMetadata;