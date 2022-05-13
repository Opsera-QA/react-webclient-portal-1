const userActivityAuditLogMetadata = {
  type: "User Activity Audit Log",
  fields: [
    {
      label: "User ID",
      id: "user_id"
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
      label: "Target ID",
      id: "target_id"
    },
    {
      label: "Target Name",
      id: "target_name"
    },
    {
      label: "Primary Attributes",
      id: "attributes"
    },
    {
      label: "Secondary Attributes",
      id: "attributes2"
    },
    {
      label: "Original Data",
      id: "originalData"
    },
    {
      label: "New Data",
      id: "newData"
    },
    {
      label: "Change Log",
      id: "changeLog"
    },
    {
      label: "Account",
      id: "account"
    },
    {
      label: "Log Date",
      id: "createdAt"
    },
  ],
  newObjectFields: {
    user_id: "",
    type: "",
    action: "",
    target_id: "",
    target_name: "",
    attributes: {},
    attributes2: {},
    originalData: {},
    newData: {},
    changeLog: {},
    account: "",
  }
};

export default userActivityAuditLogMetadata;