export const externalRestApiIntegrationStepMetadata = {
  type: "External Rest API Integration Step",
  fields: [
    {
      label: "External API Integrator Tool",
      id: "toolId",
      isRequired: true,
    },
    {
      label: "External API Endpoint",
      id: "endpointId",
      isRequired: true,
    },
  ],
  newObjectFields: {
    toolId: "",
    endpointId: "",
  }
};