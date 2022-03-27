export const externalRestApiIntegrationStepMetadata = {
  type: "External Rest API Integration Step",
  fields: [
    {
      label: "External API Integrator Tool",
      id: "toolId",
      isRequired: true,
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
      label: "External API Run Endpoint Response Evaluation Rules",
      id: "runEndpointResponseEvaluationRules",
      isRequired: true,
    },
    {
      label: "External API Status Endpoint",
      id: "statusEndpointId",
      isRequired: true,
    },
    {
      label: "External API Status Endpoint Response Evaluation Rules",
      id: "statusEndpointResponseEvaluationRules",
      isRequired: true,
    },
  ],
  newObjectFields: {
    toolId: "",
    runEndpointId: "",
    runEndpointRequestParameters: {},
    runEndpointResponseEvaluationRules: {},
    statusEndpointId: "",
    statusEndpointRequestParameters: {},
    statusEndpointResponseEvaluationRules: {},
  }
};