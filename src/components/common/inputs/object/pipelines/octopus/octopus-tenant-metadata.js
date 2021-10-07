const octopusTenantMetadata = {
  type: "Pipeline Threshold",
  fields: [
    {
      label: "Environment ID",
      id: "environmentId"
    },
    {
      label: "Tenant ID",
      id: "id"
    },
    {
      label: "Tenant Name",
      id: "name"
    },
  ],
  newObjectFields: {
    environmentId: "",
    id: "",
    name: "",
  }
};

export default octopusTenantMetadata;