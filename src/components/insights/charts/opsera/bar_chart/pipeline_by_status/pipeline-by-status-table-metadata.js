const PipelineByStatusTableMetadata = {
  idProperty: "_id",
  type: "Opsera Pipeline By Status Details",
  fields: [
    {
      label: "Name",
      id: "pipeline_name",
    },
    {
      label: "Run",
      id: "run_count",
    },
    {
      label: "Started By",
      id: "owner",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Timestamp",
      id: "timestamp",
    },
  ],
  newObjectFields: {},
};

export default PipelineByStatusTableMetadata;