const boomiSummaryLogResultMetadata = {
  type: "Boomi Summary Log Result Metadata",
  fields: [
    {
      label: "Number of Total Components",
      id: "numberOfComponentsTotal",
    },
    {
      label: "Number of Successful Components",
      id: "numberOfComponentsSuccess",
    },
    {
      label: "Number of Errored Components",
      id: "numberOfComponentsErrors"
    }
  ],
  newObjectFields: {
    numberOfComponentsTotal: "",
    numberOfComponentsSuccess: "",
    numberOfComponentsErrors: "",
  }
};

export default boomiSummaryLogResultMetadata;