import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField
  from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import InfoContainer from "components/common/containers/InfoContainer";
import {
  externalRestApiIntegrationStepHelper
} from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/externalRestApiIntegrationStep.helper";

export default function ExternalRestApiIntegrationEndpointOrchestrationSummaryBase(
  {
    endpoint,
    endpointType,
    className,
    isCollapsed,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);
  const status = DataParsingHelper.parseNestedString(parsedEndpoint, "ruleEvaluation.status");

  if (parsedEndpoint == null) {
    return null;
  }

  return (
    <div className={className}>
      <InfoContainer
        titleIcon={externalRestApiIntegrationStepHelper.getStatusIcon(status)}
        titleText={`${endpointType} Endpoint Summary: ${externalRestApiIntegrationStepHelper.getLabelForRuleEvaluationStatus(status)}`}
        isCollapsable={true}
        collapsed={isCollapsed}
        isLoading={status === "running"}
      >
        <div className={"m-2"}>
          <Row>
            <Col xs={12}>
              <ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
                ruleEvaluation={parsedEndpoint?.ruleEvaluation}
              />
            </Col>
            <Col xs={12}>
              <StandaloneTextFieldBase
                label={"Endpoint URL"}
                text={parsedEndpoint?.url}
              />
            </Col>
            <Col xs={12}>
              <StandaloneTextFieldBase
                label={"Status"}
                text={parsedEndpoint?.status}
              />
            </Col>
            <Col xs={6}>
              <StandaloneJsonField
                json={parsedEndpoint?.queryParameters}
                titleText={`API Query Parameters`}
                hideIfNoValue={true}
              />
              <StandaloneJsonField
                json={parsedEndpoint?.requestBody}
                titleText={`API Request Body`}
                hideIfNoValue={true}
              />
            </Col>
            <Col xs={6}>
              <EndpointResponseField
                responseObject={parsedEndpoint?.response}
                titleText={`API Response`}
              />
            </Col>
          </Row>
        </div>
      </InfoContainer>
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationSummaryBase.propTypes = {
  endpointType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
  isCollapsed: PropTypes.bool,
};
