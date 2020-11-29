const thresholdMetadata = {
  idProperty: undefined,
  type: "Pipeline Threshold",
  fields: [
    {
      label: "Complete First",
      id: "completeFirst",
    },
    {
      label: "Ensure Success",
      id: "ensureSuccess",
    },
  ],
  newObjectFields: {
    ensureSuccess: true,
    completeFirst: true
  }
};

export default thresholdMetadata;