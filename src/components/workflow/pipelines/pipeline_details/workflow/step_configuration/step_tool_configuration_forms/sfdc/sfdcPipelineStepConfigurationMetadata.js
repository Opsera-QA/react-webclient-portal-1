const sfdcPipelineStepConfigurationMetadata = {
  type: "SFDC Pipeline Step Configuration",
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
      label: "Platform",
      id: "service",
      isRequired: true
    },
    {
      label: "Account ID",
      id: "accountId",
      isRequired: true
    },
    {
      label: "Account",
      id: "username",
      isRequired: true
    },
    {
      label: "Enable Event Based Trigger",
      id: "trigger_active",
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
      isRequired: true
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true
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
  ],
  newObjectFields: {
    jobType: "CREATE PACKAGE XML", //hardcoded, every step wil have a hardcoded jobType is what i know needs to check with Todd.

    toolConfigId: "",
    jenkinsUrl: "",
    jenkinsPort: "",
    jUserId: "",
    jAuthToken: "",
    jobName: "",

    // gitToolId: "",
    // gitUserName: "",
    // gitUrl: "",
    // gitBranch: "",
    // gitCredential: "",

    service: "",
    accountId : "",
    username: "",
    password: "",
    repository: "",
    branch: "",

    jobDescription: "PACKAGEXML_CREATION",

    buildType: "Ant" //hardcoded now but needs to get it from a dropdown
  }
};

export default sfdcPipelineStepConfigurationMetadata;