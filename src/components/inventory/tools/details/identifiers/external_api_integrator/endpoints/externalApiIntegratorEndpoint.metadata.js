const externalApiIntegratorEndpointMetadata = {
  type: "External API Integrator Endpoint",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
      isRequired: true,
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces",
    },
    {
      label: "Request Type",
      id: "requestType",
      isRequired: true,
    },
    {
      label: "URL",
      id: "url",
      isRequired: true,
    },
    {
      label: "Headers",
      id: "headerConfiguration",
    },
    {
      label: "Query Parameter Fields",
      id: "queryParameterFields",
    },
    {
      label: "Request Body Fields",
      id: "requestBodyFields",
    },
    {
      label: "Request Parameters",
      id: "requestParameters",
    },
    {
      label: "Response Evaluation Rules",
      id: "responseEvaluationRules",
    },
    {
      label: "Response Body Type",
      id: "responseBodyType",
      isRequired: true,
    },
    {
      label: "Response Body Fields",
      id: "responseBodyFields",
    },
  ],
  newObjectFields: {
    name: "",
    type: "",
    description: "",
    requestType: "get",
    url: "",
    headerConfiguration: {},
    queryParameterFields: [],
    requestBodyFields: [],
    requestParameters: {},
    responseBodyType: "object",
    responseBodyFields: [],
    responseEvaluationRules: {},
  }
};

export default externalApiIntegratorEndpointMetadata;