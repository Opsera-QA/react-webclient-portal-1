import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import endpointRequestHeaderBearerTokenTypeConstants
  from "@opsera/definitions/constants/api/request/header/endpointRequestHeaderBearerTokenType.constants";

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
      selectOptions={endpointRequestHeaderBearerTokenTypeConstants.ENDPOINT_REQUEST_HEADER_BEARER_TOKEN_TYPE_SELECT_OPTIONS}
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