const jmeterPipelineStepConfigurationMetadata = {
  type: "Jmeter Pipeline Step Configuration",
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
      label: "Repository",
      id: "repositoryName",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true
    },
    {
      label: "Branch",
      id: "branch",
      isRequired: true
    },
    {
      label: "Branch Name",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Docker Name",
      id: "dockerName",
      // isRequired: true
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      // isRequired: true
    },
    {
      label: "JMeter Export File Name",
      id: "jmeterExportFileName",
      isRequired: true
    },
    {
      label: "JMeter File Name",
      id: "jmeterFileName",
      isRequired: true
    },
    {
      label: "Delete workspace before building",
      id: "workspaceDeleteFlag",
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
    repositoryName: "",
    branch: "",
    jmeterExportFileName: "",
    jmeterFileName: "",
    workspace: "",
    workspaceDeleteFlag: false
  }
};

export default jmeterPipelineStepConfigurationMetadata;