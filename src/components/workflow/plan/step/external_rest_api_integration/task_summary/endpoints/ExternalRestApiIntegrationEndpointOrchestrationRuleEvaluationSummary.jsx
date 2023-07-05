import React from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary(
  {
    ruleEvaluation,
    className,
  }) {
  const parsedRuleEvaluation = DataParsingHelper.parseObject(ruleEvaluation);

  if (parsedRuleEvaluation == null) {
    return null;
  }

  return (
    <div className={className}>
      <StandaloneJsonField
        json={parsedRuleEvaluation}
        titleText={`Rule Evaluation`}
        hideIfNoValue={true}
      />
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary.propTypes = {
  ruleEvaluation: PropTypes.object,
  className: PropTypes.string,
};
