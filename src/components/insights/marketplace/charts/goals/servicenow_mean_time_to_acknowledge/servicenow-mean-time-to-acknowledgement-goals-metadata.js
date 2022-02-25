const ServiceNowMttaMetaData = {
  type: "Service Now Mean Time to Acknowledgement",
  fields: [
    {
      label: "Goal: Mean Time To Acknowledgement (Hours)",
      id: "mttaAvgMeanTimeGoal",
    },
  ],
  newObjectFields: {
    mttaAvgMeanTimeGoal: 0,
  },
};

export default ServiceNowMttaMetaData;
