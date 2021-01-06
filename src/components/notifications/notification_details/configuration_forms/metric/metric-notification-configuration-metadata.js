const metricNotificationConfigurationMetadata = {
  type: "Metric Notification Configuration",
  // TODO: Faseeh, I don't know what the actual fields are so these will need to be changed.
  fields: [
    {
      label: "Notification Trigger",
      id: "trigger",
      isRequired: true
    },
    {
      label: "KPI Metric",
      id: "kpi_identifier",
      isRequired: true,
    },
  ],
  newObjectFields: {
    kpi_identifier: "",
    trigger: "",
  }
};

export default metricNotificationConfigurationMetadata;