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
    {
      label: "Steps",
      id: "steps",
    },
  ],
  newObjectFields: {
    toolId: "",
    repository: "",
    service: "",
    workspace: "",
    branch: "",
    steps: [],
  }
};
