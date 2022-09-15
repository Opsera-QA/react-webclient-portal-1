// TODO: put metadata on node server and pull down that way?
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
      label: "Slack Channel",
      id: "channel",
      isRequired: true,
      lowercase: true,
      inputMaskRegex: /^[A-Za-z0-9-_]*$/,
      formText: "# is not required"
    },
    {
      label: "Slack Notifications",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "slack",
    channel: "",
    toolId: "",
    enabled: false,
  }
};

export default slackNotificationMetadata;
