const sonarScanReportMetadata = {
  idProperty: "_id",
  type: "Sonar Scan",
  fields: [
    {
      label: "Project",
      id: "project",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "Line Number",
      id: "line",
    },
    {
      label: "Message",
      id: "message",
    },
  ],
  newObjectFields: {
    project: "",
    severity:"",
    line: "",
    message:"",
  }
};

export default sonarScanReportMetadata;