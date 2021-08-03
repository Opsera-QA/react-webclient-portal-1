const cypressPipelineStepConfigurationMetadata = {
  type: "Cypress Pipeline Step Configuration",
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
      // isRequired: true  // not sure how its working when its isRequired
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    {
      label: "Branch",
      id: "branch",
      isRequired: true
    },
    {
      label: "Rollback Branch Name",
      id: "rollbackBranchName",
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Build/Xml Step Info",
      id: "stepIdXML",
      isRequired: true
    },
    {
      label: "Docker Name",
      id: "dockerName",
      isRequired: true
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      isRequired: true
    },
    {
      label: "Docker File Path",
      id: "dockerPath",
    },
    {
      label: "Build Arguments",
      id: "buildArgs",
    },
    {
      label: "Jenkins Agent",
      id: "agentLabels",
    },
  ],
  newObjectFields: {
    jobType: "", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.
    toolConfigId: "",
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jobName: "",
    toolJobId: "",
    toolJobType: "",
    accountUsername: "",
    projectId: "",
    defaultBranch: "",
    dockerName: "",
    dockerTagName: "",
    buildType: "gradle", //hardcoded now but needs to get it from a dropdown
    gitToolId: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    service: "",
    gitCredential: "",
    gitUserName: "",
    repository: "",
    branch: "",
    jsonPath: "",
    workspace: "",
  }
};

export default cypressPipelineStepConfigurationMetadata;