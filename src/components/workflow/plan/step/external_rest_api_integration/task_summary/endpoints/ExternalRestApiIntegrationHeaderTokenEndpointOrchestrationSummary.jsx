import React from "react";
import PropTypes from "prop-types";
import ExternalRestApiIntegrationEndpointOrchestrationSummaryBase
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationSummaryBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import endpointRequestHeaderBearerTokenTypeConstants
  from "@opsera/definitions/constants/api/request/header/endpointRequestHeaderBearerTokenType.constants";
import InfoContainer from "components/common/containers/InfoContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary
  from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import EndpointResponseField from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import {faCheckCircle, faExclamationCircle} from "@fortawesome/pro-light-svg-icons";

const getStatusIcon = (parsedEndpoint) => {
  const status = DataParsingHelper.parseNestedString(parsedEndpoint, "ruleEvaluation.status");

  switch (status) {
    case "success":
      return faCheckCircle;
    case "failure":
      return faExclamationCircle;
    default:
      return null;
  }
};

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
        <InfoContainer
          titleIcon={getStatusIcon()}
          titleText={`Access Token Generation Endpoint Summary`}
          isCollapsable={true}
          collapsed={status === "success"}
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
                  label={"Status"}
                  text={parsedEndpoint?.status}
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
        </InfoContainer>
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
