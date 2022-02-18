const informaticaSummaryLogResultMetaData = {
  type: "Informatica Summary Log Result Metadata",
  fields: [
    {
      label: "Request ID",
      id: "id",
    },
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Start Time",
      id: "startTime"
    },
    {
      label: "End Time",
      id: "endTime"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Status/State",
      id: "status.state"
    },
    {
      label: "Message",
      id: "status.message"
    },
  ],
  newObjectFields: {
    id: "",
    name: "",
    startTime: "",
    endTime: "",
    status: {}
  }
};

export default informaticaSummaryLogResultMetaData;