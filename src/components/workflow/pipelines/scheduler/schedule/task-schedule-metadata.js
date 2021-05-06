const taskScheduleMetadata = {
    idProperty: "_id",
    type: "Task Schedule",
    fields: [
      {
        label: "ID",
        id: "_id",
      },
      {
        label: "Execution Date",
        id:"executionDate"
      },
      {
        label: "Frequency",
        id: "recurring"
      },
      {
        label: "Time",
        id: "time"
      }
    ],
    newObjectFields: {
      recurring: "NONE", 
      executionDate: new Date(),
      time: "", 
    },
  };
  
  export default taskScheduleMetadata;