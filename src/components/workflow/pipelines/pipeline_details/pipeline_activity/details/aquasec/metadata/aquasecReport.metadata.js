const aquasecReportMetaData = {
  type: "Aquasec Report Metadata",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Aqua Severity",
      id: "aqua_severity"
    },
    {
      label: "Aqua Score",
      id: "aqua_score"
    },
    {
      label: "NVD URL",
      id: "nvd_url"
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    aqua_severity: "",
    aqua_score: "",
    nvd_url: "",
  }
};

export default aquasecReportMetaData;
