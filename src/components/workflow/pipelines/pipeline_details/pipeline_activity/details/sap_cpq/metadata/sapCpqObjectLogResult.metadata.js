const sapCpqObjectLogResult = {
  type: "SAP CPQ Summary Log Result Metadata",
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Action",
      id: "action"
    },
    {
      label: "Status",
      id: "status"
    },
    {
      label: "Message",
      id: "message"
    },
  ],
  newObjectFields: {
    name: "",
    type: "",
    action: "",
    status: "",
    message: ""
  }
};

export default sapCpqObjectLogResult;