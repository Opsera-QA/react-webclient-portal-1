import metadataConstants from "@opsera/definitions/constants/metadata/metadata.constants";

export const sourceRepositoryConfigurationMetadata = {
  idProperty: "_id",
  type: "Source Repository Configuration",
  fields: [
    {
      label: "Name",
      id: "name",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Platform",
      id: "service",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
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
      label: "Repository",
      id: "repoId",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Git URL",
      id: "gitUrl",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Project Id",
      id: "projectId",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Primary Branch",
      id: "branch",
      isRequired: true,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Secondary Branches",
      id: "secondary_branches",
      formText: "Primary Branch must be set before setting Secondary Branches.",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.ARRAY,
    },
    {
      label: "Workspace",
      id: "workspace",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Workspace Name",
      id: "workspaceName",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Secret",
      id: "key",
      maxLength: "75",
      formText: "Optional secret for manual registration in Git Repository if supported",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Enabled",
      id: "trigger_active",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Enabled",
      id: "gitExportEnabled",
      formText: `
      Using the configured Git Repository above, Opsera can publish
      a copy of the pipeline configuration for revision purposes when export to git is pressed. 
      This feature is only available for GitHub and GitLab repositories.
      `,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Path",
      id: "gitExportPath",
      formText: "Do not include ending /",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.STRING,
    },
    {
      label: "Trigger This Pipeline On Push Events",
      id: "isPushEvent",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Trigger This Pipeline On Pull Request Events",
      id: "isPrEvent",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Trigger This Pipeline When A Pull Request Is Created",
      id: "prCreatedEvent",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Trigger This Pipeline When A Pull Request Is Approved",
      id: "prApprovedEvent",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Enabled",
      id: "dynamicSettings",
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Show Advanced Start Options Screen",
      id: "allowDynamicSettingsInUi",
      formText: `
        If this setting is enabled, users of this Pipeline will be able to set its Dynamic Settings in the UI at runtime. 
      `,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
    },
    {
      label: "Allow Dynamic Branch Switching",
      id: "enableBranchSwitch",
      formText: `
        If this setting is enabled, the Webhook can trigger runs for branches other than the one selected in the Repository settings above. 
      `,
      type: metadataConstants.SUPPORTED_VALUE_TYPES.BOOLEAN,
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