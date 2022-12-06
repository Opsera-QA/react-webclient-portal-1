const gitScraperSummaryLogResultMetaData = {
  type: "Git Scraper Summary Log Result Metadata",
  fields: [
    {
      label: "Repository",
      id: "repository",
    },{
      label: "Repository",
      id: "repositoryName",
    },
    {
      label: "Branch Name",
      id: "branch",
    },
    {
      label: "Scanned On",
      id: "scannedOn"
    },
    {
      label: "Library",
      id: "library"
    },
  ],
  newObjectFields: {
    repository: "",
    repositoryName: "",
    branch: "",
    scannedOn: "",
    library: "",
  }
};

export default gitScraperSummaryLogResultMetaData;