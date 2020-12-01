const ArgoCDStepFormMetadata = {
  type: "YAML Git Step Configuration",
  fields: [
    {
      label: "SCM Tool Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true,
    },
    {
      label: "Repository",
      id: "gitRepository",
      isRequired: true,
    },
    {
      label: "Branch",
      id: "defaultBranch",
      isRequired: true,
    },
    {
      label: "Docker/ECR Step",
      id: "dockerStepID",
      isRequired: true,
    },
    {
      label: "Commit Type",
      id: "existingContent",
    },
    {
      label: "Tool",
      id: "toolConfigId",
      isRequired: true,
    },
    {
      label: "Argo URL",
      id: "toolUrl",
      isRequired: true,
    },
    {
      label: "User Name",
      id: "userName",
      isRequired: true,
    },
    {
      label: "Application",
      id: "applicationName",
      isRequired: true,
    },
    {
      label: "Git File Path",
      id: "gitFilePath",
      isRequired: true,
    },
    {
      label: "Git Workspace",
      id: "gitWorkspace",
    },
    {
      label: "Git Repository ID",
      id: "gitRepositoryID",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "GIT URL",
      id: "gitUrl",
      isRequired: true,
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      isRequired: true,
    },
  ],
  newModelBase: {
    existingContent: "image",
    dockerStepID: "",
    gitFilePath: "",
    gitRepository: "",
    defaultBranch: "",
    gitWorkspace: "",
    type: "",
    gitToolId: "",
    toolConfigId: "",
    toolUrl: "",
    gitUrl: "",
    sshUrl: "",
    userName: "",
    applicationName: "",
    gitRepositoryID: "",
    bitbucketWorkspace: "",
  },
};

export default ArgoCDStepFormMetadata;
