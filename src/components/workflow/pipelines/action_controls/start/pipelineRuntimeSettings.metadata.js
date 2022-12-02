export const pipelineRuntimeSettingsMetadata = {
  type: "Runtime Settings",
  fields: [
    {
      label: "Tool",
      id: "toolId",
    },
    {
      label: "Service",
      id: "service",
    },
    {
      label: "Repository",
      id: "repository",
    },
    {
      label: "Workspace",
      id: "workspace",
    },
    {
      label: "Branch",
      id: "branch",
    },
  ],
  newObjectFields: {
    toolId: "",
    repository: "",
    service: "",
    workspace: "",
    branch: "",
  }
};
