export const externalRestApiIntegrationStepMetadata = {
  type: "Child Pipeline Configuration",
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