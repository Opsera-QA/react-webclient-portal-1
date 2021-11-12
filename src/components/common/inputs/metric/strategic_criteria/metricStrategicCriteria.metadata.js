const metricStrategicCriteriaMetadata = {
  fields: [
    {
      label: "Data Point",
      id: "data_point_id",
      isRequired: true
    },
    {
      label: "Type",
      id: "type",
      isRequired: true
    },
    {
      label: "Component Filter",
      id: "componentTypes",
      isRequired: true,
      infoText: "Filter by selected component types or leave blank for all"
    },
    {
      label: "Field",
      id: "field",
      isRequired: true
    },
    {
      label: "Field Filter",
      id: "fieldFilter",
    },
    {
      label: "Goal",
      id: "goal_text",
      isRequired: true
    },
  ],
  newObjectFields: {
    data_point_id: "",
    success_rule: {

    },
    warning_rule: {

    },
    failure_rule: {

    },
    goal_text: "",
  }
};

export default metricStrategicCriteriaMetadata;