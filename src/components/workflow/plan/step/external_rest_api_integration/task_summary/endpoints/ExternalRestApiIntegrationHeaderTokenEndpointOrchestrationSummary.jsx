import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import endpointRequestHeaderBearerTokenTypeConstants
  from "@opsera/definitions/constants/api/request/header/endpointRequestHeaderBearerTokenType.constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import {
  externalRestApiIntegrationStepHelper
} from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/externalRestApiIntegrationStep.helper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary(
  {
    endpoint,
    className,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);
  const status = DataParsingHelper.parseNestedString(parsedEndpoint, "ruleEvaluation.status");
  const authorizationType = DataParsingHelper.parseNestedString(parsedEndpoint, "authorizationType");

  if (parsedEndpoint == null) {
    return null;
  }

  if (authorizationType === endpointRequestHeaderBearerTokenTypeConstants.ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPES.LONG_LIVED_BEARER_TOKEN) {
    return (
      <div className={className}>
        <Row>
          <Col xs={12}>
            <H5FieldSubHeader
              subheaderText={"API Request Summary"}
              className={"mt-2"}
            />
          </Col>
          <Col xs={12}>
            <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
              ruleEvaluation={parsedEndpoint?.ruleEvaluation}
            />
          </Col>
          <Col xs={12}>
            <StandaloneTextFieldBase
              label={"Status"}
              text={externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus(status)}
            />
          </Col>
          <Col xs={12}>
            <StandaloneTextFieldBase
              label={"Access Token Custom Parameter ID"}
              text={parsedEndpoint?.customParameterId}
              showClipboardButton={true}
              visible={DataParsingHelper.isMongoDbId(parsedEndpoint?.customParameterId) === true}
            />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
      className={className}
      endpointType={"Access Token Generation"}
      endpoint={parsedEndpoint}
      isCollapsed={status === "success"}
    />
  );
}

ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary.propTypes = {
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
