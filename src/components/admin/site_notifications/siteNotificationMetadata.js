const siteNotificationMetadata = {
  idProperty: "_id",
  type: "Site Notification",
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Header",
      id: "header"
    },
    {
      label: "View",
      id: "view"
    },
    {
      label: "Message",
      id: "message"
    },
    {
      label: "FQDN Link",
      id: "link"
    },
    {
      label: "Expiration Date",
      id: "expiration"
    },
    {
      label: "Active",
      id: "active"
    },
  ],
  newObjectFields: {
    type: "",
    header: "",
    message: "",
    view: "site",
    link: "",
    expiration: new Date(),
    active: true,
  }
};

export default siteNotificationMetadata;