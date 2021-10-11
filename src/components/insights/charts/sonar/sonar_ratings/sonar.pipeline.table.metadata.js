const SonarPipelineTableMetadata = {
  idProperty: "_id",
  type: "Sonar Pipeline Table Report",
  fields: [
    {
      label: "Project Name",
      id: "project",
    },
    {
      label: "Recent Scan",
      id: "runCount",
    },
    {
      label: "Trend",
      id: "status",
    },
    {
      label: "Critical",
      id: "critical",
      className:'red',
      Cell: function parseStatus(row) {
        console.log(row,'****');
        return '123';
      },
    },
    {
      label: "Major",
      id: "major",
    },
    {
      label: "Minor",
      id: "minor",
    },
    {
      label: "Info",
      id: "info",
    },
    {
      label: "Remediation Effort (in minutes)",
      id: "total_effort",
    },
  ],
  newObjectFields: {},
};

export default SonarPipelineTableMetadata;