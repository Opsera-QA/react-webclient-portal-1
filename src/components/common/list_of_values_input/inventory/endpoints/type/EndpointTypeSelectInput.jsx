import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import endpointTypeConstants from "@opsera/definitions/constants/api/request/endpoint/endpointType.constants";

function EndpointTypeSelectInput(
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
      selectOptions={endpointTypeConstants.ENDPOINT_TYPE_SELECT_OPTIONS}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

EndpointTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

EndpointTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default EndpointTypeSelectInput;