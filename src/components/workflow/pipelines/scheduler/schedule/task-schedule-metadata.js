const taskScheduleMetadata = {
  type: "Task Schedule",
  fields: [
    {
      label: "Execution Date",
      id: "executionDate",
      isRequired: true,
    },
    {
      label: "Frequency",
      id: "recurring",
      isRequired: true
    },
    {
      label: "Time",
      id: "time",
      // isRequired: true
    }
  ],
  newObjectFields: {
    recurring: "NONE",
    executionDate: new Date(),
    time: "",
  },
};

export default taskScheduleMetadata;