import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPE_SELECT_OPTIONS
} from "components/common/list_of_values_input/inventory/endpoints/header/bearer_token/endpointRequestHeaderBearerTokenType.constants";

function EndpointRequestHeaderBearerTokenTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

EndpointRequestHeaderBearerTokenTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

EndpointRequestHeaderBearerTokenTypeSelectInput.defaultProps = {
  fieldName: "authorizationType",
};

export default EndpointRequestHeaderBearerTokenTypeSelectInput;