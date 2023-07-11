import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/ExternalRestApiIntegrationEndpointOrchestrationRuleEvaluationSummary";
import InfoContainer from "components/common/containers/InfoContainer";
import { externalRestApiIntegrationStepHelper } from "components/workflow/plan/step/external_rest_api_integration/task_summary/endpoints/externalRestApiIntegrationStep.helper";
import FieldContainer from "components/common/fields/FieldContainer";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function ExternalRestApiIntegrationEndpointOrchestrationSummaryBase(
  {
    endpoint,
    className,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);

  if (parsedEndpoint == null) {
    return null;
  }

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
            label={"Endpoint URL"}
            text={parsedEndpoint?.url}
            showClipboardButton={true}
          />
        </Col>
        <Col xs={12}>
          <FieldContainer>
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
          </FieldContainer>
        </Col>
        <Col xs={12}>
          <EndpointResponseField
            responseObject={parsedEndpoint?.response}
            titleText={`API Response Summary`}
          />
        </Col>
      </Row>
    </div>
  );
}

ExternalRestApiIntegrationEndpointOrchestrationSummaryBase.propTypes = {
  endpoint: PropTypes.object,
  className: PropTypes.string,
  isCollapsed: PropTypes.bool,
};
