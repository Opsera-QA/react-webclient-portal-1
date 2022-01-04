const ServiceNowMTTRMetaData = {
  type: "Service Now Mean Time to Resolution",
  fields: [
    {
      label: "Goal: Average Mean Time (Hours)",
      id: "mttrAvgMeanTimeGoal",
    },
  ],
  newObjectFields: {
    mttrAvgMeanTimeGoal: 0,
  },
};

export default ServiceNowMTTRMetaData;
