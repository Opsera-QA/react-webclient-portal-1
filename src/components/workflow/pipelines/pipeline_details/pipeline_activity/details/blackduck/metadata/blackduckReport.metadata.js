const blackduckReportMetaData = {
  type: "Blackduck Report Metadata",
  fields: [
    {
      label: "Category",
      id: "category",
    },
    {
      label: "Critical",
      id: "critical",
    },
    {
      label: "High",
      id: "high",
    },
    {
      label: "Medium",
      id: "medium"
    },
    {
      label: "Low",
      id: "low",
    },
    {
      label: "Ok",
      id: "ok",
    },
    {
      label: "Unknown",
      id: "unknown",
    },
  ],
  newObjectFields: {
    category: "",
    critical: "",
    high: "",
    medium: "",
    low: "",
    ok: "",
    unknown: "",
  }
};

export default blackduckReportMetaData;
