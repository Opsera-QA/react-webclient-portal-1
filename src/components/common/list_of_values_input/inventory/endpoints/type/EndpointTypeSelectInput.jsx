import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  ENDPOINT_TYPE_SELECT_OPTIONS,
} from "components/common/list_of_values_input/inventory/endpoints/type/endpointType.constants";

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
      selectOptions={ENDPOINT_TYPE_SELECT_OPTIONS}
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