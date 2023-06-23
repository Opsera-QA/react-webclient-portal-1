import apiResponseEvaluationOptionConstants
  from "@opsera/definitions/constants/api/response/apiResponseEvaluationOption.constants";

export const endpointResponseFieldEvaluationRuleMetadata = {
  fields: [
    {
      label: "Field Name",
      id: "fieldName",
      isRequired: true
    },
    {
      label: "Filter",
      id: "filter",
      isRequired: true
    },
    {
      label: "Value",
      id: "value",
      isRequired: true,
    },
  ],
  newObjectFields: {
    fieldName: "",
    filter: apiResponseEvaluationOptionConstants.API_RESPONSE_EVALUATION_OPTIONS.IS_NOT_NULL,
    value: "",
  }
};
