const sonarPipelineScanReportMetadata = {
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
      label: "Type",
      id: "type",
    },
    {
      label: "Line Number",
      id: "line",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Author",
      id: "author",
    },
    {
      label: "Component",
      id: "component",
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

export default sonarPipelineScanReportMetadata;