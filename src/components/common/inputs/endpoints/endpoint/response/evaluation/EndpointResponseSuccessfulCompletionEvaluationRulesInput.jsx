import React from "react";
import PropTypes from "prop-types";
import EndpointResponseEvaluationRulesInput from "components/common/inputs/endpoints/endpoint/response/evaluation/EndpointResponseEvaluationRulesInput";

export default function EndpointResponseSuccessfulCompletionEvaluationRulesInput(
  {
    toolId,
    endpointId,
    model,
    setModel,
    disabled,
  }) {
  return (
    <EndpointResponseEvaluationRulesInput
      fieldName={"statusEndpointResponseEvaluationRules"}
      evaluationRuleFieldName={"success_rule"}
      model={model}
      setModel={setModel}
      toolId={toolId}
      endpointId={endpointId}
      disabled={disabled}
    />
  );
}

EndpointResponseSuccessfulCompletionEvaluationRulesInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
  endpointId: PropTypes.string,
};
