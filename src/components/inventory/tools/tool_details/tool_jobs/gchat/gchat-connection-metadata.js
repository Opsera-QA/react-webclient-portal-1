const gchatConnectionMetadata = {
  type: "Google Chat Configuration",
  fields: [
    {
      label: "GChat Webhook URL",
      id: "webhookUrl",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      webhookUrl: "",
    }
};

export default gchatConnectionMetadata;
