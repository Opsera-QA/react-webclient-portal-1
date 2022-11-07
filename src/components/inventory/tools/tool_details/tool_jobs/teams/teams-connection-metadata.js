const teamsConnectionMetadata = {
  type: "Microsoft Teams Configuration",
  fields: [
    {
      label: "Teams Webhook URL",
      id: "webhookUrl",
      isRequired: true,
      isSecureUrl: true,
    },
  ],
  newObjectFields:
    {
      webhookUrl: "",
    }
};

export default teamsConnectionMetadata;