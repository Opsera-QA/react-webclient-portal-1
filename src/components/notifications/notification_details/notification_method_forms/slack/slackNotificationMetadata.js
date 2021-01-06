const slackNotificationMetadata = {
  idProperty: "name",
  type: "Slack Step Notification",
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Slack Tool",
      id: "toolId",
      isRequired: true
    },
    {
      label: "Notification Level",
      id: "event",
      isRequired: true
    },
    {
      label: "Slack Channel",
      id: "channel",
      isRequired: true,
      lowercase: true,
      inputMaskRegex: /^[A-Za-z0-9-_]*$/,
      formText: "# is not required"
    },
  ],
  newObjectFields: {
    type: "slack",
    channel: "",
    toolId: "",
    event: "finished",
  }
};

export default slackNotificationMetadata;