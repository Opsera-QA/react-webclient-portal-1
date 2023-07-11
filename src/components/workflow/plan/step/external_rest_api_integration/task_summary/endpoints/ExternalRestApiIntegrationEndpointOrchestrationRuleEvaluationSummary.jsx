import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { externalRestApiIntegrationStepHelper } from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/externalRestApiIntegrationStep.helper";

// TODO: Write metadata rather than constructing standalone components
export default function ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary(
  {
    ruleEvaluation,
    latestStatusCheckTime,
    className,
  }) {
  const parsedRuleEvaluation = DataParsingHelper.parseObject(ruleEvaluation);

  const getStatusCheckTimeDataBlock = () => {
    const parsedFormattedDate = DateFormatHelper.formatDate(latestStatusCheckTime, DateFormatHelper.DATE_FORMATS.TIMESTAMP);

    if (parsedFormattedDate) {
      return (
        <Col xs={12}>
          <StandaloneTextFieldBase
            label={"Latest Status Check"}
            text={parsedFormattedDate}
            showClipboardButton={true}
          />
        </Col>
      );
    }
  };

  if (parsedRuleEvaluation == null) {
    return null;
  }

  return (
    <div className={className}>
      <div className={"d-flex w-100"}>
        <Row>
          {getStatusCheckTimeDataBlock()}
          <Col xs={12}>
            <StandaloneTextFieldBase
              label={"Status"}
              text={externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus(parsedRuleEvaluation?.status)}
            />
          </Col>
          <Col xs={12}>
            <StandaloneTextFieldBase
              label={"Message"}
              text={parsedRuleEvaluation?.message}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary.propTypes = {
  ruleEvaluation: PropTypes.object,
  latestStatusCheckTime: PropTypes.string,
  className: PropTypes.string,
};
