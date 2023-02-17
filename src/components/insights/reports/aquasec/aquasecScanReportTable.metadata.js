const aquasecScanReportMetadata = {
  idProperty: "_id",
  type: "Aquasec Scan",
  fields: [
    {
      label: "Component Name",
      id: "componentName",
    },
    {
      label: "Component Version",
      id: "componentVersion",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "CVE ID",
      id: "identifier",
    },
    {
      label: "CVE Score",
      id: "score",
    },
    {
      label: "Description",
      id: "description",
    },
  ],
  newObjectFields: {
    imageName: "",
    componentName: "",
    severity:"",
    cve_id: "",
    cve_Score: "",
    description: "",
  }
};

export default aquasecScanReportMetadata;