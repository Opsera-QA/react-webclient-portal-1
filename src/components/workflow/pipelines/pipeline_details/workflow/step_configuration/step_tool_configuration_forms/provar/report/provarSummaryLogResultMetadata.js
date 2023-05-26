const provarSummaryLogResultMetaData = {
  type: "Provar Summary Log Result Metadata",
  fields: [
    {
      label: "Class Name",
      id: "className",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Time",
      id: "time",
    },
    {
      label: "Tests",
      id: "tests",
    },
    {
      label: "Failures",
      id: "failures",
    },
    {
      label: "Failure Cause",
      id: "failure",
    },
    {
      label: "Tests Skipped",
      id: "skipped",
    },
    {
      label: "Pipeline Id",
      id: "pipelineId",
    },
    {
      label: "Pipeline Id",
      id: "pipelineId",
    },
    {
      label: "Step Id",
      id: "stepId",
    },
    {
      label: "Has Dowloadable Report",
      id: "hasDowloadableReport",
    },
    {
      label: "Expiration Time",
      id: "expirationTime",
    },
  ],
  newObjectFields: {
    pipelineId: "",
    stepId: "",
    hasDowloadableReport: "",
    expirationTime: "",
    className: "",
    name: "",
    time: "",
    tests: "",
    failures: "",
    skipped: "",
    failure: "",
  },
};

export default provarSummaryLogResultMetaData;
