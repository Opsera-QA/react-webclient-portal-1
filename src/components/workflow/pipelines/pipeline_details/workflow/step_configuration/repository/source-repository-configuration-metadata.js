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
      label: "Account ID",
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
      label: "Repository ID",
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
      label: "Trigger Active",
      id: "trigger_active",
      formText: `
        To enable webhook event based pipeline runs from your repository, either configure
        the account above to register it automatically or use the URL below (and optional security key) to configure
        your repository manually.  If a specific repository and branch are selected above through account registration,
        then ONLY events from that branch can trigger this pipeline, if no repository and branch are specified then
        any commit events will trigger the pipeline.
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