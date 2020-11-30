const childPipelineStepConfigurationMetadata = {
  type: "Child Pipeline Configuration",
  fields: [
    {
      label: "Pipeline",
      id: "pipelineId",
      isRequired: true
    },
  ],
  newModelBase: {
    pipelineId: "",
  }
};

export default childPipelineStepConfigurationMetadata;