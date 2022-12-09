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
      label: "Threshold",
      id: "threshold",
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
    threshold: "",
    level: "",
  }
};

export default sonarReportMetaData;
