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
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Repository ID",
      id: "repoId",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Project ID",
      id: "projectId",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "SCM Service Type",
      id: "service",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "GIT URL",
      id: "gitUrl",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "SSH URL",
      id: "sshUrl",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Repository",
      id: "repository",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Workspace",
      id: "workspace",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Workspace/Project",
      id: "workspaceName",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Branch",
      id: "branch",
      formText: "Selected SCM info must match the data configured in the buildkite pipeline"
    },
    {
      label: "Commit",
      id: "commit",
    },
    {
      label: "Commit Message",
      id: "message",
    }
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
    message: "",
  }
};

export default buildkiteMetadata;