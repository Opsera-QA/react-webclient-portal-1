const junitTestResultsTableMetadata = {
    idProperty: "_id",
    type: "JUnit Test Results",
    fields: [
      {
        label: "Job",
        id: "jobId",
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
  
  export default junitTestResultsTableMetadata;