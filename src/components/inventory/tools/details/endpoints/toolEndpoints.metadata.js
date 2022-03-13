const toolEndpointsMetadata = {
  type: "Tool Endpoint",
  fields: [
    {
      label: "Name",
      id: "name",
      maxLength: 50,
      regexDefinitionName: "generalTextWithSpaces",
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
  ],
  newObjectFields: {
    name: "",
    description: "",
    requestType: "",
    url: "",
  }
};

export default toolEndpointsMetadata;