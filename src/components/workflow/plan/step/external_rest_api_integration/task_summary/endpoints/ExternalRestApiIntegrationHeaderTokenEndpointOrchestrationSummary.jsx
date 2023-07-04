import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EndpointResponseField
  from "components/common/inputs/endpoints/endpoint/response/EndpointResponseField";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export default function ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary(
  {
    endpoint,
    requestType,
    className,
  }) {
  console.log("endpoint: " + JSON.stringify(endpoint));

  if (dataParsingHelper.hasObjectProperties(endpoint) !== true) {
    return null;
  }

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={`${requestType} Access Token Generation Endpoint Response`}
      />
      <Row>
        {/*<Col xs={6}>*/}
        {/*  <StandaloneJsonField*/}
        {/*    json={endpoint?.request}*/}
        {/*    titleText={`Connection Check API Request`}*/}
        {/*  />*/}
        {/*</Col>*/}
        {/*<Col xs={6}>*/}
        <Col xs={12}>
          <EndpointResponseField
            responseObject={endpoint}
            titleText={`Access Token Generation API Response`}
          />
        </Col>
      </Row>
    </div>
  );
}

ExternalRestApiIntegrationHeaderTokenEndpointOrchestrationSummary.propTypes = {
  requestType: PropTypes.string,
  endpoint: PropTypes.object,
  className: PropTypes.string,
};
