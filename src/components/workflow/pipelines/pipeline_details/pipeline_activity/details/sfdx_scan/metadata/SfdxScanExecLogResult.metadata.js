const informaticaObjectLogResultMetaData = {
  type: "Execution Summary Log Result Metadata",
  fields: [
    {
      label: "File Name",
      id: "file",
    },
    {
      label: "Rule Name",
      id: "rule",
    },
    {
      label: "Category",
      id: "category"
    },
    {
      label: "Description",
      id: "description"
    },
    {
      label: "Line",
      id: "line"
    },
    {
      label: "Column",
      id: "column"
    },
    {
      label: "Severity",
      id: "severity"
    },

    {
      label: "Scan Engine",
      id: "engine"
    },
  ],
  newObjectFields: {
    file: "",
    rule: "",
    category: "",
    description: "",
    line: "",
    column: "",
    severity: "",
    engine: ""
  }
};

export default informaticaObjectLogResultMetaData;