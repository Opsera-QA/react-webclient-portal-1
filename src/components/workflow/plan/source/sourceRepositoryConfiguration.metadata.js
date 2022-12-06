export const sourceRepositoryConfigurationMetadata = {
  idProperty: "_id",
  type: "Source Repository Configuration",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Platform",
      id: "service",
      isRequired: true,
    },
    {
      label: "Account",
      id: "accountId",
    },
    {
      label: "Username",
      id: "username",
      isRequired: true,
    },
    {
      label: "Password",
      id: "password",
    },
    {
      label: "Repository",
      id: "repoId",
      isRequired: true,
    },
    {
      label: "Git URL",
      id: "gitUrl",
    },
    {
      label: "SSH URL",
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "repositoryName",
      isRequired: true,
    },
    {
      label: "Primary Branch",
      id: "branch",
      isRequired: true,
    },
    {
      label: "Secondary Branches",
      id: "secondary_branches",
      formText: "Primary Branch must be set before setting Secondary Branches.",
    },
    {
      label: "Workspace",
      id: "workspace",
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
    },
    {
      label: "Secret",
      id: "key",
      maxLength: "75",
      formText: "Optional secret for manual registration in Git Repository if supported",
    },
    {
      label: "Enabled",
      id: "trigger_active",
      formText: `
        Allow this pipeline to be started by a webhook event based on above settings. Once enabled, copy the webhook URL supplied into your repository.
      `,
    },
    {
      label: "Enabled",
      id: "gitExportEnabled",
      formText: `
      Using the configured Git Repository above, Opsera can publish
      a copy of the pipeline configuration for revision purposes when export to git is pressed. 
      This feature is only available for GitHub and GitLab repositories.
      `,
    },
    {
      label: "Path",
      id: "gitExportPath",
      formText: "Do not include ending /"
    },
    {
      label: "Push Events",
      id: "isPushEvent",
      formText: "Enabling this will trigger this pipeline for push events only"
    },
    {
      label: "PR Events",
      id: "isPrEvent",
      formText: "Enabling this will trigger this pipeline for PR events"
    },
    {
      label: "PR Created",
      id: "prCreatedEvent",
      formText: "Enable this if you want to trigger only once PR is created"
    },
    {
      label: "PR Approved",
      id: "prApprovedEvent",
      formText: "Enable this if you want to trigger only if PR is approved"
    },
    {
      label: "Dynamic Settings",
      id: "dynamicSettings",
    },
  ],
  dbSupportedFieldNames: [
    "name",
    "service",
    "accountId",
    "username",
    "password",
    "workspace",
    "workspaceName",
    "repository",
    "repoId",
    "gitUrl",
    "sshUrl",
    "branch",
    "secondary_branches",
    "key",
    "trigger_active",
    "isPushEvent",
    "isPrEvent",
    "prCreatedEvent",
    "prApprovedEvent",
    "gitExportEnabled",
    "gitExportPath",
    "dynamicSettings",
  ],
  newObjectFields: {
    name: "",
    service: "",
    accountId: "",
    username: "",
    password: "",
    repoId: "",
    gitUrl: "",
    sshUrl: "",
    repository: "",
    repositoryName: "",
    branch: "",
    workspace: "",
    workspaceName: "",
    key: "",
    trigger_active: false,
    isPushEvent: true,
    isPrEvent: false,
    prCreatedEvent: true,
    prApprovedEvent: false,
    dynamicSettings: false,
  },
};