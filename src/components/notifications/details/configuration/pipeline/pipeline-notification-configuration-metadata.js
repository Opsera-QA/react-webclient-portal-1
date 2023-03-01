const pipelineNotificationConfigurationMetadata = {
  type: "Pipeline Notification Configuration",
  // TODO: Faseeh, I don't know what the actual fields are so these will need to be changed.
  fields: [
    {
      label: "Notification Trigger",
      id: "trigger",
      isRequired: true
    },
  ],
  newObjectFields:
    {
      trigger: "",
    }
};

export default pipelineNotificationConfigurationMetadata;