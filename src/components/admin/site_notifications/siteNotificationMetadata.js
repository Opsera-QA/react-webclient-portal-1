import regexHelpers from "utils/regexHelpers";

const siteNotificationMetadata = {
  idProperty: "_id",
  type: "Site Notification",
  detailViewTitle: function(record) {
    return `Site Notification Manager`;
  },
  fields: [
    {
      label: "Type",
      id: "type"
    },
    {
      label: "Header",
      id: "header",
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces
    },
    {
      label: "View",
      id: "view"
    },
    {
      label: "Message",
      id: "message",
      maxLength: 250,
      regexValidator: regexHelpers.regexTypes.expandedTextAndSymbolsWithSpaces
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