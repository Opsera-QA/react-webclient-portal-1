const seleniumTestResultsTableMetadata = {
  idProperty: "_id",
  type: "Selenium Test Results",
  fields: [
    {
      label: "Job",
      id: "pipelineId",
    },
    {
      label: "Run",
      id: "runCount",
    },
    {
      label: "Timestamp",
      id: "timestamp",
    },
    {
      label: "Tests",
      id: "testsRun",
    },
    {
      label: "Passed",
      id: "testsPassed",
    },
    {
      label: "Failed",
      id: "testsFailed",
    },
    {
      label: "Skipped",
      id: "testsSkipped",
    },
    {
      label: "Duration(s)",
      id: "duration",
    },
  ],
  newObjectFields: {},
};

export default seleniumTestResultsTableMetadata;
