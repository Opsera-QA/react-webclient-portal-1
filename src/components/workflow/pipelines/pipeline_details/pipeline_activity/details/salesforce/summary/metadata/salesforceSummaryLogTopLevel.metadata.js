const salesforceSummaryLogTopLevelMetadata = {
  type: "Salesforce Summary Log Top Level Metadata",
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
    {
      label: "Deploy Result",
      id: "deployResult"
    },
  ],
  newObjectFields: {
    id: "",
    validatedDeployRequestId: "",
    deployOptions: [],
    deployResult: {},
  }
};

export default salesforceSummaryLogTopLevelMetadata;