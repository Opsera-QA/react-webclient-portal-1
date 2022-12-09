const sonarReportMetaData = {
  type: "Sonar Report Metadata",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Operation",
      id: "operation",
    },
    {
      label: "Actual",
      id: "actual"
    },
    {
      label: "Error",
      id: "error",
    },
    {
      label: "Level",
      id: "level",
    },    
  ],
  newObjectFields: {
    name: "",
    operation: "",
    actual: "",
    error: "",
    level: "",
  }
};

export default sonarReportMetaData;
