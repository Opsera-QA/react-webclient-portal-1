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
      label: "Project Id",
      id: "projectId",
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
      label: "Trigger This Pipeline On Push Events",
      id: "isPushEvent",
    },
    {
      label: "Trigger This Pipeline On Pull Request Events",
      id: "isPrEvent",
    },
    {
      label: "Trigger This Pipeline When A Pull Request Is Created",
      id: "prCreatedEvent",
    },
    {
      label: "Trigger This Pipeline When A Pull Request Is Approved",
      id: "prApprovedEvent",
    },
    {
      label: "Enabled",
      id: "dynamicSettings",
    },
    {
      label: "Show Advanced Start Options Screen",
      id: "allowDynamicSettingsInUi",
      formText: `
        If this setting is enabled, users of this Pipeline will be able to set its Dynamic Settings in the UI at runtime. 
      `
    },
    {
      label: "Enable Branch Switching",
      id: "enableBranchSwitch",
      formText: `
        If this setting is enabled, users of this Pipeline will be able to set Dynamic Branch at runtime. 
      `
    },
  ],
  dbSupportedFieldNames: [
    "name",
    "service",
    "accountId",
    "workspace",
    "workspaceName",
    "repository",
    "repoId",
    "projectId",
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
    "allowDynamicSettingsInUi",
    "enableBranchSwitch",
  ],
  newObjectFields: {
    name: "",
    service: "",
    accountId: "",
    repoId: "",
    projectId: "",
    gitUrl: "",
    sshUrl: "",
    repository: "",
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
    enableBranchSwitch: false,
  },
};