const metricNotificationConfigurationMetadata = {
  type: "Metric Notification Configuration",
  // TODO: Faseeh, I don't know what the actual fields are so these will need to be changed.
  fields: [
    {
      label: "KPI Metric",
      id: "kpi_identifier",
      isRequired: true,
    },
    {
      label: "Condition triggers if",
      id: "conditionIf",
      isRequired: true
    },
    {
      label: "is at least",
      id: "atLeast",
      isRequired: true,
    },
    {
      label: "Condition",
      id: "condition",
      isRequired: true,
    },
    {
      label: "Threshold",
      id: "threshold",
      isRequired: true,
    },
    {
      label: "For",
      id: "for",
      isRequired: true,
    },
  ],
  newObjectFields: {
    kpi_identifier: "",
    conditionIf: "This needs to be pulled from kpi, I think",
    atLeast: 1,
    condition: "",
    threshold: 45,
    for: ""
  }
};

export default metricNotificationConfigurationMetadata;