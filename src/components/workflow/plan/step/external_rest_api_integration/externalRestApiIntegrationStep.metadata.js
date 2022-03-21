export const externalRestApiIntegrationStepMetadata = {
  type: "External Rest API Integration Step",
  fields: [
    {
      label: "External API Integrator Tool",
      id: "toolId",
      isRequired: true,
      formText: "A Run and Status Endpoint must be configured in the selected Tool"
    },
    {
      label: "External API Run Endpoint",
      id: "runEndpointId",
      isRequired: true,
    },
    {
      label: "External API Run Endpoint Request Parameters",
      id: "runEndpointRequestParameters",
      isRequired: true,
    },
    {
      label: "External API Run Endpoint Response Evaluation Parameters",
      id: "runEndpointResponseEvaluationParameters",
      isRequired: true,
    },
    {
      label: "External API Status Endpoint",
      id: "statusEndpointId",
      isRequired: true,
    },
    {
      label: "External API Status Endpoint Response Evaluation Parameters",
      id: "statusEndpointResponseEvaluationParameters",
      isRequired: true,
    },
  ],
  newObjectFields: {
    toolId: "",
    runEndpointId: "",
    runEndpointRequestParameters: {},
    runEndpointResponseEvaluationParameters: {},
    statusEndpointId: "",
    statusEndpointRequestParameters: {},
    statusEndpointResponseEvaluationParameters: {},
  }
};