const gitScraperReportMetaData = {
  type: "Git Scraper Summary Log Result Metadata",
  fields: [
    {
      label: "Author",
      id: "author",
    },
    {
      label: "Commit",
      id: "commit",
    },
    {
      label: "Path",
      id: "path"
    },
    {
      label: "Commit Hash",
      id: "commitHash"
    },
    {
      label: "Path",
      id: "path"
    },
    {
      label: "Line Number",
      id: "lineNumber"
    },
    {
      label: "Reason",
      id: "reason"
    },
  ],
  newObjectFields: {
    author: "",
    commit: "",
    commitHash: "",
    path: "",
    lineNumber: "",
    reason: ""
  }
};

export default gitScraperReportMetaData;