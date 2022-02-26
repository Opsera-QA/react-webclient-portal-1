const dataPointEvaluationRulesMetadata = {
  fields: [
    {
      label: "Success Rule",
      id: "success_rule",
    },
    {
      label: "Warning Rule",
      id: "warning_rule",
    },
    {
      label: "Failure Rule",
      id: "failure_rule",
    },
    {
      label: "Enable Rule",
      id: "enabled",
    },
  ],
  newObjectFields: {
    success_rule: {
      type: "success",
      trigger_filter: "",
      primary_trigger_value: 0,
      secondary_trigger_value: 0,
      enabled: true,
    },
    warning_rule: {
      type: "warning",
      trigger_filter: "",
      primary_trigger_value: 0,
      secondary_trigger_value: 0,
      enabled: true,
    },
    failure_rule: {
      type: "failure",
      trigger_filter: "",
      primary_trigger_value: 0,
      secondary_trigger_value: 0,
      enabled: true,
    },
  }
};

export default dataPointEvaluationRulesMetadata;