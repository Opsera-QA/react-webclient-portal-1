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
      id: "message",
      maxLength: 250
    },
    {
      label: "FQDN Link",
      id: "link"
    },
    {
      label: "Begin Date",
      id: "displayOnDate"
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
    displayOnDate: new Date(),
    expiration: new Date(),
    active: true,
  }
};

export default siteNotificationMetadata;