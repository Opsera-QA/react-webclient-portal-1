export const externalRestApiIntegrationStepMetadata = {
  type: "External Rest API Integration Step",
  fields: [
    {
      label: "External API Integrator Tool",
      id: "toolId",
      isRequired: true,
    },
    {
      label: "Connection Check Endpoint",
      id: "connectionCheckEndpointId",
      isRequired: true,
    },
    {
      label: "Use Connection Check",
      id: "useConnectionCheck",
    },
    {
      label: "Connection Check Request Parameters",
      id: "connectionCheckRequestParameters",
      isRequired: true,
    },
    {
      label: "Connection Check Response Evaluation Rules",
      id: "connectionCheckResponseEvaluationRules",
      isRequired: true,
    },
    {
      label: "Run Trigger Endpoint",
      id: "runEndpointId",
      isRequired: true,
    },
    {
      label: "Run Trigger Request Parameters",
      id: "runEndpointRequestParameters",
      isRequired: true,
    },
    {
      label: "Run Trigger Response Evaluation Rules",
      id: "runEndpointResponseEvaluationRules",
      isRequired: true,
    },
    {
      label: "Status Check Endpoint",
      id: "statusEndpointId",
      isRequired: true,
    },
    {
      label: "Status Check Request Parameters",
      id: "statusEndpointRequestParameters",
      isRequired: true,
    },
    {
      label: "Status Check Response Evaluation Rules",
      id: "statusEndpointResponseEvaluationRules",
      isRequired: true,
    },
  ],
  newObjectFields: {
    toolId: "",
    useConnectionCheck: false,
    connectionCheckEndpointId: "",
    connectionCheckRequestParameters: {},
    connectionCheckResponseEvaluationRules: {},
    runEndpointId: "",
    runEndpointRequestParameters: {},
    runEndpointResponseEvaluationRules: {},
    statusEndpointId: "",
    statusEndpointRequestParameters: {},
    statusEndpointResponseEvaluationRules: {},
  }
};