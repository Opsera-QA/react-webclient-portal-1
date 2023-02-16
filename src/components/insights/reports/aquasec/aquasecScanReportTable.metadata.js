const aquasecScanReportMetadata = {
  idProperty: "_id",
  type: "Aquasec Scan",
  fields: [
    {
      label: "Image Name",
      id: "imageName",
    },
    {
      label: "Component Name",
      id: "componentName",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "CVE ID",
      id: "cve_id",
    },
    {
      label: "CVE Score",
      id: "cve_score",
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