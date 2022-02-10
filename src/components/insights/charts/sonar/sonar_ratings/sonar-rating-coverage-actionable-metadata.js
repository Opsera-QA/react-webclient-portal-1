const SonarCoverageTableMetadata = {
  idProperty: "_id",
  type: "Sonar Pipeline Table Report",
  fields: [
    {
      label: "Project",
      id: "_id",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Run Count",
      id: "runCount",
    },
    {
      label: "Timestamp",
      id: "timestamp",
    },
    {
      label: "Code Coverage %",
      id: "coverage",
    },
    {
      label: "Duplicated Lines",
      id: "duplicate_lines",
    },
    {
      label: "Duplicated Line Density %",
      id: "duplicated_lines_density",
    },
    {
      label: "Lines to Cover",
      id: "lines_to_cover",
    },
    {
      label: "Uncovered Lines",
      id: "uncovered_lines",
    },
  ],
  newObjectFields: {},
};

export default SonarCoverageTableMetadata;