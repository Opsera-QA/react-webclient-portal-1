export const insightsLookupDetailsMetadata = {
  idProperty: "_id",
  type: "Lookup Details",
  fields: [
    {
      label: "Pipeline ID",
      id: "pipelineId",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Job Type",
      id: "jobType",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "Step Id",
      id: "stepId",
    },
    {
      label: "Deployed By",
      id: "deployName",
    },
    {
      label: "Deployment Start",
      id: "startTimestamp",
    },
    {
      label: "Deployment End",
      id: "endTimestamp",
    },
    {
      label: "Durations (mins)",
      id: "difference",
    },
    {
      label: "Validated",
      id: "validated",
    },
    {
      label: "Deployed",
      id: "deployed",
    },{
      label: "Unit Tested",
      id: "unitTests",
    },
  ],
  newObjectFields: {
    name: "",
  },
};
