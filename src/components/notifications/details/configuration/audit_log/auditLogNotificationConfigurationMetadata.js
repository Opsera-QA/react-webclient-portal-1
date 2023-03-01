export const auditLogNotificationConfigurationMetadata = {
  type: "Audit Log Notification Configuration",
  fields: [
    {
      label: "Notification Trigger",
      id: "events",
      isRequired: true
    },
  ],
  newObjectFields: {
    events: [],
  },
};
