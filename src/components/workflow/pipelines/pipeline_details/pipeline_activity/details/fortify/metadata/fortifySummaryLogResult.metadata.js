const fortifySummaryLogResultMetaData = {
  type: "Fortify Summary Log Result Metadata",
  fields: [
    {
      label: "Application Id",
      id: "fortifyApplicationId",
    },
    {
      label: "Release Id",
      id: "fortifyReleaseId",
    },
  ],
  newObjectFields: {
    fortifyApplicationId: "",
    fortifyReleaseId: "",
  }
};

export default fortifySummaryLogResultMetaData;
