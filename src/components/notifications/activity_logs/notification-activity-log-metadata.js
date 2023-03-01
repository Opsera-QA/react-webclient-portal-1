const notificationActivityLogMetadata = {
  idProperty: "_id",
  type: "Notification Policy",
  detailView: function(record) {
    return `/notifications/details/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "Name",
      id: "name",
    },
    {
      label: "Type",
      id: "type",
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
      label: "Notification Method",
      id: "method",
      isRequired: true,
    },
    {
      label: "Notification Info",
      id: "notification",
    },
    {
      label: "Active",
      id: "active",
    },
    {
      label: "Configuration",
      id: "configuration",
    },
    {
      label: "Status",
      id: "status",
    },
    {
      label: "Tags",
      id: "tags",
    },
    {
      label: "Created",
      id: "createdAt",
    },
    {
      label: "Notification Recipient",
      id: "target",
    }
  ],
};

export default notificationActivityLogMetadata;