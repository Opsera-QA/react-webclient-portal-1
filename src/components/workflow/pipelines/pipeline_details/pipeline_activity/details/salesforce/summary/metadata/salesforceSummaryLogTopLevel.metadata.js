const salesforceSummaryLogTopLevelMetadata = {
  type: "Salesforce Summary Log Metadata",
  fields: [
    {
      label: "Request ID",
      id: "id",
    },
    {
      label: "Validated Deploy Request ID",
      id: "validatedDeployRequestId",
    },
    {
      label: "Deploy Options",
      id: "deployOptions"
    },
  ],
  newObjectFields: {
    id: "",
    validatedDeployRequestId: "",
    deployOptions: [],
  }
};

export default salesforceSummaryLogTopLevelMetadata;