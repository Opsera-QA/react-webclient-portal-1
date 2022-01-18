const SentenialStepFormMetadata = {
  type: "Sentenial Step Configuration",
  fields: [
    {
      label: "SCM Tool Type",
      id: "service",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
      isRequired: true
    },
    {
      label: "Repository",
      id: "repository",
      isRequired: true
    },
    {
      label: "Branch",
      id: "gitBranch",
      isRequired: true
    },
    {
      label: "Git Repository ID",
      id: "repoId",
    },
    {
      label: "BitBucket Workspace",
      id: "bitbucketWorkspace",
    },
    {
      label: "BitBucket Workspace/Project",
      id: "bitbucketWorkspaceName",
    },
    {
      label: "Parameters",
      id: "customParameters",
      maxItems: 15,
    },
    {
      label: "Commands",
      id: "commands"
    },
    {
      label: "Tag",
      id: "tag"
    }
  ],
  newObjectFields: {
    repository: "",
    gitBranch: "",
    service:"",
    gitToolId : "",
    repoId: "",
    sshUrl:"",
    gitUrl:"",
    bitbucketWorkspace : "",
    bitbucketWorkspaceName: "",
    customParameters: "",
    commands: "",
    tag: ""
  }
};

export default SentenialStepFormMetadata;