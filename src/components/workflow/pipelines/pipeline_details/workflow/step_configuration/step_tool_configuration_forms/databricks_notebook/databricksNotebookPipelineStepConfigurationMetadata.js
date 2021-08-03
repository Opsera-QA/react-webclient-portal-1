const databricksNotebookPipelineStepConfigurationMetadata = {
  type: "Databricks Notebook Pipeline Configuration",
  fields: [
    {
      label: "Databricks Endpoint URL",
      id: "endpointUrl",
      isRequired: true
    },
    {
      label: "Data Package",
      id: "dataPackage",
      isRequired: true,
      formText: "The JSON data above must be properly formatted and match the necessary job ID."
    },
    {
      label: "Authorization Token",
      id: "authToken",
      isRequired: true
    },
  ],
  newObjectFields: {
    endpointUrl: "",
    dataPackage: {},
    authToken: ""
  }
};

export default databricksNotebookPipelineStepConfigurationMetadata;