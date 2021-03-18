const jmeterConnectTimeTableMetadata = {
    idProperty: "_id",
    type: "Jmeter Connect Time",
    fields: [
      {
        label: "Build ID",
        id: "toolData.jenkinsJobId"
      },
      {
        label: "Test Case",
        id: "toolData.uri"
      },
      {
        label: "Average (ms)",
        id: "toolData.mean"
      },
      {
        label: "Minimum (ms)",
        id: "toolData.min"
      },
      {
        label: "Median (ms)",
        id: "toolData.median"
      },
      {
        label: "Maximum (ms)",
        id: "toolData.max"
      },
    ],
    newObjectFields: {
    }
  };
  
  export default jmeterConnectTimeTableMetadata;