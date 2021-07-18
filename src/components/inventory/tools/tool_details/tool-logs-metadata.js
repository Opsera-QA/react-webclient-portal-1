const toolLogsMetadata = {
  idProperty: "_id",
  type: "Tool Log",
  activeField: "active",
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Action",
      id: "action",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Message",
      id: "message",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Info",
      id: "row",
    },
  ],
  newObjectFields: {
    action: "",
    message: "",
    tool_identifier: "",
    costCenter: "",
    status: "",
    vault: ""
  }
};

export default toolLogsMetadata;