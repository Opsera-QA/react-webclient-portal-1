const blueprintMetadata = {
  idProperty: "_id",
  type: "Blueprint Search",
  fields: [
    {
      label: "Run Number",
      id: "runNumber",
      isRequired: true,
      formText: "Defaults to latest run of the selected pipeline. Enter custom if required.",
      minNumber: 1
    },
    {
      label: "Pipeline ID",
      id: "pipelineId"
    },
  ],
  newObjectFields: {
    runNumber: null,
    pipelineId: "",
    title: ""
  }
};

export default blueprintMetadata;