const sonarPipelineStepConfigurationMetadata = {
  type: "Sonar Pipeline Step Configuration",
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
      label: "Sonar Credentials",
      id: "sonarToolConfigId",
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
      label: "Branch",
      id: "branch",
      isRequired: true
    },
    {
      label: "Sonar Source Path",
      id: "sonarSourcePath",
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
    projectKey: "",

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
    sonarSourcePath: "",
    workspace: "",
    // agentLabels : "",
  }
};

export default sonarPipelineStepConfigurationMetadata;