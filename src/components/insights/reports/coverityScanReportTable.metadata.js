const coverityScanReportMetadata = {
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
      label: "Owner",
      id: "owner",
    },
    {
      label: "Issue Category",
      id: "issue_category",
    },
    {
      label: "Action",
      id: "action",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Date",
      id: "date",
    },
    {
      label: "File",
      id: "file",
    },
    {
      label: "Issue Type",
      id: "issue_type",
    },
  ],
  newObjectFields: {
    project: "",
    severity:"",
    line: "",
    message:"",
  }
};

export default coverityScanReportMetadata;