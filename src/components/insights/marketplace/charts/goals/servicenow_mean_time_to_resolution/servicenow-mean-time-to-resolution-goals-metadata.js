const ServiceNowMTTRMetaData = {
  type: "Service Now Mean Time to Resolution",
  fields: [
    {
      label: "Goal: Average Mean Time (Mins)",
      id: "mttrAvgMeanTimeGoal",
    },
  ],
  newObjectFields: {
    mttrAvgMeanTimeGoal: 0,
  },
};

export default ServiceNowMTTRMetaData;
