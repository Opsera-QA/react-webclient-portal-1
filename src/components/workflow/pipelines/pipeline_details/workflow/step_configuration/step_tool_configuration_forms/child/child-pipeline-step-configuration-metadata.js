const childPipelineStepConfigurationMetadata = {
  type: "Child Pipeline Configuration",
  fields: [
    {
      label: "Pipeline",
      id: "pipelineId",
      isRequired: true
    },
    {
      label: "Threshold",
      id: "threshold",
      isRequired: true
    },
    {
      label: "Ensure Success",
      id: "ensureSuccess",
      isRequired: true,
    },
    {
      label: "Wait for Completion",
      id: "completeFirst",
      isRequired: true
    }
  ],
  newModelBase: {
    pipelineId: "",
    threshold: {},
    ensureSuccess: true,
    completeFirst: true,
  }
};

export default childPipelineStepConfigurationMetadata;