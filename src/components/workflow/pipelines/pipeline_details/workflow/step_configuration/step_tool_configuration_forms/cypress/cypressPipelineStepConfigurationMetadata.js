const cypressPipelineStepConfigurationMetadata = {
  type: "Cypress Pipeline Step Configuration",
  fields: [
    {
      label: "Jenkins Tool",
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
      isRequiredFunction: (model) => {
        return model?.getData("opsera_job_type") === "job";
      },
    },
    {
      label: "Jenkins URL",
      id: "jenkinsUrl",
      isRequired: true
    },
    {
      label: "Jenkins User ID",
      id: "jUserId",
      isRequired: true
    },
    {
      label: "Jenkins Authorization Token",
      id: "jAuthToken",
      isRequired: true
    },
    {
      label: "Job",
      id: "toolJobId",
    },
    {
      label: "Account",
      id: "gitCredential",
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
    },
    {
      label: "Branch",
      id: "branch",
    },
    {
      label: "Rollback Branch Name",
      id: "rollbackBranchName",
    },
    {
      label: "Branch Name",
      id: "gitBranch",
    },
    {
      label: "Build/Xml Step Info",
      id: "stepIdXML",
    },
    {
      label: "Docker Name",
      id: "dockerName",
      isRequiredFunction: (model) => {
        return model?.getData("buildType") === "docker";
      },
    },
    {
      label: "Docker Tag",
      id: "dockerTagName",
      isRequiredFunction: (model) => {
        return model?.getData("buildType") === "docker";
      },
    },
    {
      label: "JSON Path",
      id: "jsonPath",
      maxLength: 250,
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
    {
      label: "Delete Workspace Before Building",
      id: "workspaceDeleteFlag",
    },
  ],
  newObjectFields: {
    jobType: "CYPRESS UNIT TESTING",
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
    workspaceName: "",
    workspaceDeleteFlag: false
    // agentLabels : "",
  }
};

export default cypressPipelineStepConfigurationMetadata;