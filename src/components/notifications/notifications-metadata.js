const notificationsMetadata = {
  idProperty: "_id",
  type: "Notification Policy",
  activeField: "active",
  detailView: function(record) {
    return `/notifications/details/${record.getData("_id")}`;
  },
  detailViewTitle: function (record) {
    return `Notification Details ${record.getOriginalValue("name")}`;
  },
  fields: [
    {
      label: "ID",
      id: "_id",
    },
    {
      label: "Name",
      id: "name",
      isRequired: true,
      maxLength: 50,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
    },
    {
      label: "Description",
      id: "description",
      maxLength: 1000,
      regexDefinitionName: "expandedTextAndSymbolsWithSpaces"
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