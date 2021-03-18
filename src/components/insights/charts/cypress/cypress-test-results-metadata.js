const cypressTestResultsTableMetadata = {
    idProperty: "_id",
    type: "Cypress Test Results",
    fields: [
      {
        label: "Job",
        id: "pipelineId",
      },
      {
        label: "Run",
        id: "runCount"
      },
      {
        label: "Timestamp",
        id: "timestamp",
      },
      {
        label: "Tests",
        id: "testsRun"
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
        label: "Duration(s)",
        id: "duration"
      }
    ],
    newObjectFields: {
    }
  };
  
  export default cypressTestResultsTableMetadata;