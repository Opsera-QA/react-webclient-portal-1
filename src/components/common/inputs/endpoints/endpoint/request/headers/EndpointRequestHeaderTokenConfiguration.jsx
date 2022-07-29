import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CustomParameterSelectInput from "components/common/list_of_values_input/parameters/CustomParameterSelectInput";
import EndpointRequestHeaderBearerTokenTypeSelectInput
  from "components/common/list_of_values_input/inventory/endpoints/header/bearer_token/EndpointRequestHeaderBearerTokenTypeSelectInput";
import {
  ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPES
} from "components/common/list_of_values_input/inventory/endpoints/header/bearer_token/endpointRequestHeaderBearerTokenType.constants";
import EndpointRequestHeaderBearerTokenEndpointSelectInput
  from "components/common/list_of_values_input/inventory/endpoints/header/token_endpoint/EndpointRequestHeaderBearerTokenEndpointSelectInput";
import EndpointResponseBodyFieldSelectInput
  from "components/common/list_of_values_input/inventory/endpoints/field/EndpointResponseBodyFieldSelectInput";

function EndpointRequestHeaderTokenConfiguration(
  {
    disabled,
    endpointRequestHeaderConfigurationModel,
    setEndpointRequestHeaderConfigurationModel,
    updateMainModelFunction,
    toolId,
  }) {

  // TODO: Make separate input
  const updateCustomParameterId = (fieldName, selectedOption) => {
    endpointRequestHeaderConfigurationModel.setData(fieldName, selectedOption?._id);
    updateMainModelFunction(endpointRequestHeaderConfigurationModel);
  };

  const getInputsForAuthorizationType = () => {
    switch (endpointRequestHeaderConfigurationModel?.getData("authorizationType")) {
      case ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPES.SHORT_LIVED_BEARER_TOKEN:
        return (
          <>
            <Col xs={12}>
              <EndpointRequestHeaderBearerTokenEndpointSelectInput
                toolId={toolId}
                model={endpointRequestHeaderConfigurationModel}
                setModel={updateMainModelFunction}
                disabled={disabled}
              />
            </Col>
            <Col xs={12}>
              <EndpointResponseBodyFieldSelectInput
                toolId={toolId}
                endpointId={endpointRequestHeaderConfigurationModel?.getData("accessTokenGenerationEndpointId")}
                model={endpointRequestHeaderConfigurationModel}
                setModel={updateMainModelFunction}
                fieldName={"accessTokenResponseBodyField"}
                disabled={disabled}
              />
            </Col>
          </>
        );
      case ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPES.LONG_LIVED_BEARER_TOKEN:
      default:
        return (
          <Col xs={12}>
            <CustomParameterSelectInput
              model={endpointRequestHeaderConfigurationModel}
              setModel={setEndpointRequestHeaderConfigurationModel}
              setDataFunction={updateCustomParameterId}
              disabled={disabled}
              fieldName={"authorizationTokenCustomParameterId"}
            />
          </Col>
        );
    }
  };

  if (endpointRequestHeaderConfigurationModel == null) {
    return null;
  }

  return (
    <Row>
      <Col xs={12}>
        <EndpointRequestHeaderBearerTokenTypeSelectInput
          model={endpointRequestHeaderConfigurationModel}
          setModel={setEndpointRequestHeaderConfigurationModel}
          disabled={disabled}
        />
      </Col>
      {getInputsForAuthorizationType()}
    </Row>
  );
}

EndpointRequestHeaderTokenConfiguration.propTypes = {
  endpointRequestHeaderConfigurationModel: PropTypes.object,
  setEndpointRequestHeaderConfigurationModel: PropTypes.func,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  toolId: PropTypes.string,
};

export default EndpointRequestHeaderTokenConfiguration;