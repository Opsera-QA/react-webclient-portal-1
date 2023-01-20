export const externalRestApiIntegrationStepMetadata = {
  type: "External Rest API Integration Step",
  fields: [
    {
      label: "External API Integrator Tool",
      id: "toolId",
      isRequired: true,
    },
    {
      label: "Connection Validation Endpoint",
      id: "connectionCheckEndpointId",
      isRequiredFunction: (model) => {
        return model?.getData("useConnectionCheck") === true;
      },
    },
    {
      label: "Validate Connection",
      id: "useConnectionCheck",
    },
    {
      label: "Connection Validation Request Parameters",
      id: "connectionCheckRequestParameters",
    },
    {
      label: "Connection Validation Response Evaluation Rules",
      id: "connectionCheckResponseEvaluationRules",
      isRequired: true,
    },
    {
      label: "Call Operation Endpoint",
      id: "runEndpointId",
      isRequired: true,
    },
    {
      label: "Call Operation Request Parameters",
      id: "runEndpointRequestParameters",
    },
    {
      label: "Call Operation Response Evaluation Rules",
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