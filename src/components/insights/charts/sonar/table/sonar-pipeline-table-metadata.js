const SonarPipelineTableMetadata = {
  idProperty: "_id",
  type: "Opsera Pipeline Sonar Report",
  fields: [
    {
      label: "Severity",
      id: "severity",
    },
    {
      label: "File Name",
      id: "component",
    },
    {
      label: "Line Number",
      id: "line",
    },
    {
      label: "Message",
      id: "message",
    },
    {
      label: "Remediation Effort",
      id: "effort",
    },
  ],
  newObjectFields: {},
};

export default SonarPipelineTableMetadata;