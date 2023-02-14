const auditLogsNotificationConfigurationMetadata = {
  type: "Audit Log Notification Configuration",
  fields: [
    {
      label: "Notification Trigger",
      id: "trigger",
      isRequired: true
    },
  ],
  newObjectFields: {
      trigger: "",
  },
};

export default auditLogsNotificationConfigurationMetadata;