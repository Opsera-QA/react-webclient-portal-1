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
    {
      label: "Application Name",
      id: "fortifyApplicationName",
    },
    {
      label: "Release Name",
      id: "fortifyReleaseName",
    },
  ],
  newObjectFields: {
    fortifyApplicationId: "",
    fortifyReleaseId: "",
    fortifyApplicationName: "",
    fortifyReleaseName: "",
  }
};

export default fortifySummaryLogResultMetaData;
