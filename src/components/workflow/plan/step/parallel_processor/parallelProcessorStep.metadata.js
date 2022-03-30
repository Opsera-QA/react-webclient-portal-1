export const parallelProcessorStepMetadata = {
  type: "Parallel Pipeline Configuration",
  fields: [
    {
      label: "Pipelines",
      id: "pipelines",
      isRequired: true,
      maxItems: 5,
      formText: "Please select up to 5 Pipelines."
    },
  ],
  newObjectFields: {
    pipelines: [],
  }
};