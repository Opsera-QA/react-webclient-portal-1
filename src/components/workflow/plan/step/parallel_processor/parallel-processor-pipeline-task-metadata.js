const parallelProcessorPipelineTaskMetadata = {
  type: "Parallel Pipeline Task Metadata",
  fields: [
    {
      label: "Run Count",
      id: "run_count",
    },
    {
      label: "Task Action",
      id: "action",
    },
    {
      label: null,
      id: "api_response.apiResponse.message.message"
    },
    {
      label: "Logged On",
      id: "createdAt"
    },
    {
      label: "Tool Object",
      id: "step_configuration.tool"
    },
    {
      label: "Tool",
      id: "tool_identifier"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "State",
      id: "state"
    },
    {
      label: "Task",
      id: "step_name"
    },
    {
      label: null,
      id: "api_response.apiResponse.message.runResponse"
    },
    {
      label: "Triggered By",
      id: "user_id"
    },
  ],
  newObjectFields: {
  }
};

export default parallelProcessorPipelineTaskMetadata;