import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField
  from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationEndpointOrchestrationSummaryBase(
  {
    endpoint,
    endpointType,
    requestType,
    children,
    className,
  }) {
  const parsedEndpoint = DataParsingHelper.parseObject(endpoint);

  if (parsedEndpoint == null) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={`${requestType} ${endpointType} Endpoint Response`}
      />
      <Row>
        <Col xs={12}>
          <StandaloneJsonField
            json={parsedEndpoint?.ruleEvaluation}
            titleText={`Rule Evaluation`}
            hideIfNoValue={true}
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
        {children}
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
  );
}

ExternalRestApiIntegrationEndpointOrchestrationSummaryBase.propTypes = {
  requestType: PropTypes.string,
  endpointType: PropTypes.string,
  endpoint: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
};
