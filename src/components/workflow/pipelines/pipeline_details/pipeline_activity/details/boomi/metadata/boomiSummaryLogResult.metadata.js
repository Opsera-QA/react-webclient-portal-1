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
    },
    {
      label: "Number of Total Packages",
      id: "numberOfPackagesTotal",
    },
    {
      label: "Number of Successful Packages",
      id: "numberOfPackagesSuccess",
    },
    {
      label: "Number of Errored Packages",
      id: "numberOfPackagesErrors"
    }
  ],
  newObjectFields: {
    numberOfComponentsTotal: "",
    numberOfComponentsSuccess: "",
    numberOfComponentsErrors: "",
    numberOfPackagesTotal: "",
    numberOfPackagesSuccess: "",
    numberOfPackagesErrors: "",
  }
};

export default boomiSummaryLogResultMetadata;