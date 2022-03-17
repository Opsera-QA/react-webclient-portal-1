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
    {
      label: "Request Body Fields",
      id: "requestBodyFields",
    },
    {
      label: "Response Body Fields",
      id: "responseBodyFields",
    },
  ],
  newObjectFields: {
    name: "",
    description: "",
    requestType: "",
    url: "",
    requestBodyFields: [],
    responseBodyFields: [],
  }
};

export default toolEndpointsMetadata;