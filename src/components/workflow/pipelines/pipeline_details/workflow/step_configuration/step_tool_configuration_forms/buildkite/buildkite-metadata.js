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
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Repository ID",
      id: "repoId",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Project ID",
      id: "projectId",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "SCM Service Type",
      id: "service",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "GIT URL",
      id: "gitUrl",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Repository",
      id: "repository",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Workspace",
      id: "workspace",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      formText: "Select SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Branch",
      id: "branch",
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
    branch : "",
    commit : "",
    message: ""
  }
};

export default buildkiteMetadata;