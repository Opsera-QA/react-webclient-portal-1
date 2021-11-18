import regexDefinitions from "utils/regexDefinitions";

const dataPointEvaluationRowMetadata = {
  fields: [
    {
      label: "Type",
      id: "type",
    },
    {
      label: "Trigger When Metric Data is",
      id: "trigger_filter",
    },
    {
      label: "Value",
      id: "primary_trigger_value",
      regexDefinitionName: "decimalField",
      inputMaskRegex: regexDefinitions.decimalField.regex,
    },
    {
      label: "Secondary Value",
      id: "secondary_trigger_value",
      regexDefinitionName: "decimalField",
      inputMaskRegex: regexDefinitions.decimalField.regex,
    },
    {
      label: "Enabled",
      id: "enabled",
    },
  ],
  newObjectFields: {
    type: "",
    trigger_filter: "",
    primary_trigger_value: 0,
    secondary_trigger_value: 0,
    enabled: false,
  }
};

export default dataPointEvaluationRowMetadata;