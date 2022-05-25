const sfdxScanLogSummaryResultMetadata = {
  type: "Summary Log Result Metadata",
  fields: [
    {
      label: "Rule ID",
      id: "ruleId",
    },
    {
      label: "Rule Name",
      id: "ruleName",
    },
    {
      label: "Rule",
      id: "rule",
    },
    {
      label: "Engine",
      id: "engine",
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
    ruleName: "",
    rule: "",
    engine: "",
    category: "",
    count: "",
    threshold: "",
    passStatus: "",
    description: "",
  }
};

export default sfdxScanLogSummaryResultMetadata;