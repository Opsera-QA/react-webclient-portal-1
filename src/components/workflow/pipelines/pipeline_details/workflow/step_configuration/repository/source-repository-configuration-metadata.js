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
      label: "Trigger Active",
      id: "trigger_active",
      formText: `
        Pipelines can be triggered by commit webhook events. 
        To configure this pipeline to run anytime a commit occurs in the repository/branch, please complete the fields above. 
        Then copy the webhook URL into your repository and configure it accordingly.
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