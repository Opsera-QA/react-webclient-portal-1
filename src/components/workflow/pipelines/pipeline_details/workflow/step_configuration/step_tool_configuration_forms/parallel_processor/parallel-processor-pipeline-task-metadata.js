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
      label: "Message",
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
      label: "Task",
      id: "step_name"
    },
    {
      label: "Parallel Pipelines",
      id: "api_response.apiResponse.message.runResponse"
    }
  ],
  newModelBase: {
  }
};

export default parallelProcessorPipelineTaskMetadata;