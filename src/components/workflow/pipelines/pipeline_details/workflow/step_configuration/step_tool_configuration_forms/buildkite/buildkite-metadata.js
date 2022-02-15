const buildkiteMetadata = {
  type: "Buildkite Tool Configuration",
  fields: [
    {
      label: "Buildkite Tool",
      id: "toolConfigId",
      isRequired: true
    },
    {
      label: "Buildkite Pipeline",
      id: "pipeline",
      isRequired: true
    },
    {
      label: "SCM Tool",
      id: "gitToolId",
    },
    {
      label: "Repository ID",
      id: "repoId",
    },
    {
      label: "Project ID",
      id: "projectId",
    },
    {
      label: "SCM Service Type",
      id: "service",
    },
    {
      label: "GIT URL",
      id: "gitUrl"
    },
    {
      label: "SSH URL",
      id: "sshUrl",
    },
    {
      label: "Repository",
      id: "repository",
    },
    {
      label: "Workspace",
      id: "workspace"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName"
    },
    {
      label: "Branch",
      id: "defaultBranch",
    },
    {
      label: "Commit",
      id: "commit",
    },
    {
      label: "Commit Message",
      id: "message",
    },
  ],
  newObjectFields: {
    toolConfigId: "",
    pipeline: "",
    gitToolId : "",
    repoId : "",
    projectId : "",
    service : "",
    gitUrl : "",
    sshUrl : "",
    repository : "",
    workspace : "",
    workspaceName : "",
    defaultBranch : "",
    commit : "",
    message: ""
  }
};

export default buildkiteMetadata;