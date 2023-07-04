import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField
  from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import StandaloneTextFieldBase from "components/common/fields/text/standalone/StandaloneTextFieldBase";

export default function ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary(
  {
    endpoint,
    requestType,
    className,
  }) {
  if (dataParsingHelper.hasObjectProperties(endpoint) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={`${requestType} Connection Check Endpoint Response`}
      />
      <Row>
        <Col xs={12}>
          <StandaloneTextFieldBase
            label={"Endpoint URL"}
            text={endpoint?.url}
          />
        </Col>
        <Col xs={6}>
          <StandaloneJsonField
            json={endpoint?.queryParameters}
            titleText={`Connection Check API Query Parameters`}
            hideIfNoValue={true}
          />
          <StandaloneJsonField
            json={endpoint?.requestBody}
            titleText={`Connection Check API Request Body`}
            hideIfNoValue={true}
          />
        </Col>
        <Col xs={6}>
          <EndpointResponseField
            responseObject={endpoint?.response}
            titleText={`Connection Check API Response`}
          />
        </Col>
      </Row>
    </div>
  );
}

ExternalRestApiIntegrationConnectionCheckEndpointOrchestrationSummary.propTypes = {
  requestType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
