import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField
  from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import EndpointRequestField
  from "components/common/inputs/endpoints/endpoint/request/EndpointRequestField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export const EXTERNAL_REST_API_INTEGRATION_REQUEST_TYPES = {
  CALL_OPERATION: "Call Operation",
  CONNECTION_VALIDATION: "Connection Validation",
  HEADER_TOKEN: "Header Token",
  STATUS_CHECK: "Status Check",
};

function ExternalRestApiIntegrationEndpointSummary({ endpoint, requestType, className }) {
  if (dataParsingHelper.hasObjectProperties(endpoint) !== true || hasStringValue(requestType) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader subheaderText={`${requestType}`} />
      <Row>
        <Col xs={6}>
          <EndpointRequestField
            titleText={`${requestType} API Request`}
            endpointObject={endpoint}
          />
        </Col>
        <Col xs={6}>
          <EndpointResponseField
            responseObject={endpoint?.response}
            titleText={`${requestType} API Response`}
          />
        </Col>
      </Row>
    </div>
  );
}

ExternalRestApiIntegrationEndpointSummary.propTypes = {
  requestType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
};


export default ExternalRestApiIntegrationEndpointSummary;
