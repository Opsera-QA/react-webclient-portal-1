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
    {
      label: "Scanned On",
      id: "scannedOn"
    },
    {
      label: "Branch",
      id: "branch"
    },
    {
      label: "Repository",
      id: "repository"
    },
    {
      label: "Tool",
      id: "gitToolId"
    },
  ],
  newObjectFields: {
    author: "",
    commit: "",
    commitHash: "",
    path: "",
    lineNumber: "",
    reason: "",
    scannedOn: "",
    branch: "",
    repository: "",
    gitToolId: ""
  }
};

export default gitScraperReportMetaData;