const sonarPipelineStepMetadata = {
  type: "Sonar Pipeline Step Configuration",
  fields: [
    {
      label: "Jenkins Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Job Type",
      id: "jobType",
      isRequired: true,
    },
    {
      label: "Job Type",
      id: "opsera_job_type",
      isRequired: true,
    },{
      label: "Project Key",
      id: "projectKey",
      isRequired: true,
      maxLength: 150,
      // TODO: Don't allow spaces
    },
    {
      label: "Job Name",
      id: "jobName",
      isRequired: true,
      maxLength: 150,
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
    jobType: "",
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
    buildType: "gradle",
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
    workspaceName: "",
    sonarToolConfigId: "",
    workspaceDeleteFlag: false,
    jobDescription: "",
    opsera_job_type: "",
    // agentLabels : "",
  }
};

export default sonarPipelineStepMetadata;