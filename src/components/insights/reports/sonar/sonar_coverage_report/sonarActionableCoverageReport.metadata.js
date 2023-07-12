const sonarActionableCoverageReportMetadata = {
  idProperty: "_id",
  type: "Sonar Coverage Scan",
  fields: [
    {
      label: "Path",
      id: "path",
    },
    {
      label: "File Name",
      id: "name",
    },
    {
      label: "Uncovered Lines",
      id: "uncovered_lines",
    },
    {
      label: "Complexity",
      id: "complexity",
    },
    {
      label: "Line Coverage",
      id: "line_coverage",
    },
    {
      label: "Lines to Cover",
      id: "lines_to_cover",
    },
    {
      label: "Coverage",
      id: "coverage",
    },
  ],
  newObjectFields: {
    project: "",
    "uncovered_lines":"",
    complexity: "",
    "line_coverage":"",
    coverage: "",
  }
};

export default sonarActionableCoverageReportMetadata;