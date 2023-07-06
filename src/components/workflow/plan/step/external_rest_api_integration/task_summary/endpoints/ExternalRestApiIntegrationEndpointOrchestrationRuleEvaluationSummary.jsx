import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

// TODO: Write metadata rather than constructing standalone components
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
      <StandaloneTextFieldBase
        label={"Status"}
        text={parsedRuleEvaluation?.status}
      />
      <StandaloneTextFieldBase
        label={"Status Message"}
        text={parsedRuleEvaluation?.message}
      />
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary.propTypes = {
  ruleEvaluation: PropTypes.object,
  className: PropTypes.string,
};
