const snykSastSecurityReportMetadata = {
  type: "Snyk SAST Security Report",
  fields: [
    {
      label: "Id",
      id: "id",
    },
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "Category",
      id: "category",
    },
    {
      label: "Categories",
      id: "categories",
    },
    {
      label: "CWE",
      id: "cwe",
    },
    {
      label: "File Path",
      id: "filePath",
    },
    {
      label: "Line Number",
      id: "lineNumber",
    },
    {
      label: "Start Line",
      id: "startLine",
    },

    {
      label: "End Line",
      id: "endLine",
    },
    {
      label: "Message",
      id: "message",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Snyk Product",
      id: "snykProduct",
    },
  ],
  newObjectFields: {
    id: "",
    severity: "",
    category: "",
    categories: "",
    cwe: "",
    filePath: "",
    lineNumber: "",
    startLine: "",
    endLine: "",
    message: "",
    tags: "",
    snykProduct: "",
  }
};

export default snykSastSecurityReportMetadata;
