import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import apiFieldTypeConstants from "@opsera/definitions/constants/api/request/apiFieldType.constants";

export default function ApiResponseFieldTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    setDataFunction,
    disabled,
  }) {
  return (
    <SelectInputBase
      selectOptions={apiFieldTypeConstants.API_RESPONSE_FIELD_TYPE_SELECT_OPTIONS}
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

ApiResponseFieldTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};
