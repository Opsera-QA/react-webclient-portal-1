const sourceRepositoryConfigurationMetadata = {
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
      label: "Primary Branch",
      id: "branch",
      isRequired: true,
    },
    {
      label: "Secondary Branches",
      id: "secondary_branches",
      formText: "Primary Branch must be set before setting Secondary Branches."
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
    branch: "",
    workspace: "",
    workspaceName: "",
    key: "",
    trigger_active: false,
  },
};

export default sourceRepositoryConfigurationMetadata;