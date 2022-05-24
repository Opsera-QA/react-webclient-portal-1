const sfdxScanLogSummaryResultMetadata = {
  type: "Summary Log Result Metadata",
  fields: [
    {
      label: "Rule ID",
      id: "ruleId",
    },
    {
      label: "Rule",
      id: "rule",
    },
    {
      label: "Category",
      id: "category",
    },
    {
      label: "Count",
      id: "count"
    },
    {
      label: "Threshold",
      id: "threshold"
    },
    {
      label: "Pass Status",
      id: "passStatus"
    },
    {
      label: "Description",
      id: "description"
    },
  ],
  newObjectFields: {
    ruleId: "",
    rule: "",
    category: "",
    count: "",
    threshold: "",
    passStatus: "",
    description: "",
  }
};

export default sfdxScanLogSummaryResultMetadata;