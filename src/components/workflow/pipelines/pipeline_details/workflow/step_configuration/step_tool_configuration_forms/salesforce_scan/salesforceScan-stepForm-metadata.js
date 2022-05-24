const salesforceScanStepFormMetadata = {
  type: "Salesforce Scan Tool Configuration",
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
      // isRequired: true
    },
    {
      label: "Job",
      id: "toolJobId",
      isRequired: true
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
      label: "Workspace/Project",
      id: "workspaceName",
      // isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      // isRequired: true
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      // isRequired: true
    },
    {
      label: "Build/Package Step",
      id: "stepIdXML",
      isRequired: true
    },
    {
      label: "Quality Gates",
      id: "qualityGateIds",
      isRequired: true
    },
    {
      label: "Select Salesforce Scan Tool",
      id: "sfdxScanToolId",
      isRequired: true
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
    stepIdXML: "",
    sfdxScanToolId: "",
    qualityGateIds: [],
  }
};

export default salesforceScanStepFormMetadata;