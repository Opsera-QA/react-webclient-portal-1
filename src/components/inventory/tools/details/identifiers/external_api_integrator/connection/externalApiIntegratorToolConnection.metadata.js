export const externalApiIntegratorToolConnectionMetadata = {
  type: "External API Integrator Tool Configuration",
  idProperty: "_id",
  fields: [
    {
      label: "Connection Check URL",
      id: "connection_check_url",
      maxLength: 2048,
      regexDefinitionName: "urlField",
    },
  ],
  newObjectFields: {
    connection_check_url: "",
  }
};
