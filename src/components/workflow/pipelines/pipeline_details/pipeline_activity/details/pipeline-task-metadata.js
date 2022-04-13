const pipelineTaskMetadata = {
  type: "Generic Pipeline Task Metadata",
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
      label: "Message",
      id: "api_response.apiResponse.message.message"
    },
    {
      label: "Message",
      id: "message"
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
      label: "Task",
      id: "step_name"
    },
    {
      label: "Triggered By",
      id: "user_id"
    },
  ],
  newObjectFields: {
  }
};

export default pipelineTaskMetadata;