const pipelineActivityMetadata = {
  idProperty: "_id",
  // detailView: function(record) {
  //   return `/inventory/tools/details/${record.getData("_id")}`;
  // },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Run Count",
      id: "run_count",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tool",
      id: "tool_identifier",
    },
    {
      label: "Task",
      id: "step_name",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "State",
      id: "state"
    },
    {
      label: "Date",
      id: "createdAt",
    },
    {
      label: "Action",
      id: "action",
    },
    {
      label: "Message",
      id: "message",
    },
  ]
};

export default pipelineActivityMetadata;