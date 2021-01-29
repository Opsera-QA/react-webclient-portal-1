const notificationsMetadata = {
  idProperty: "_id",
  type: "Notification Policy",
  detailView: function(record) {
    return `/notifications/details/${record.getData("_id")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true
    },
    {
      label: "Description",
      id: "description",
    },
    {
      label: "Owner",
      id: "owner_name",
    },
    {
      label: "Type",
      id: "type",
      isRequired: true,
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
      label: "What next steps to be taken?",
      id: "nextSteps",
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
  newObjectFields: {
    name: "",
    description: "",
    type: "",
    method: "",
    notification: {},
    active: true,
    configuration: {},
    status: "",
    tags: [],
    nextSteps: "",
  }
};

export default notificationsMetadata;