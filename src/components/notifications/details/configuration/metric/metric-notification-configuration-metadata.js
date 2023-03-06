const metricNotificationConfigurationMetadata = {
  type: "Metric Notification Configuration",
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
      label: "Select Data Point",
      id: "dataPointName",
      // isRequired: true
    },
    {
      label: "Data Point",
      id: "dataPoint",
      // isRequired: true
    },
    {
      label: "is at least",
      id: "atLeast",
      // isRequired: true,
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
  ],
  newObjectFields: {
    kpi_identifier: "",
    conditionIf: "",
    dataPoint: "",
    atLeast: 1,
    condition: "",
    threshold: 45,
  }
};

export default metricNotificationConfigurationMetadata;