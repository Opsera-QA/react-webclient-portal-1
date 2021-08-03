const conditionalOperationStepConfigurationMetadata = {
  type: "Conditional Operation Pipeline Configuration",
  fields: [
    {
      label: "Pipeline",
      id: "pipelineId",
      isRequired: true
    },
    {
      label: "Conditions",
      id: "conditions",
      isRequired: true
    },
  ],
  newObjectFields: {
    pipelineId: "",
    conditions: []
  }
};

export default conditionalOperationStepConfigurationMetadata;