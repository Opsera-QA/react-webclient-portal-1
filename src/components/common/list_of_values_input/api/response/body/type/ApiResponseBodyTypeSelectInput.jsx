import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import apiFieldTypeConstants from "@opsera/definitions/constants/api/request/apiFieldType.constants";

export default function ApiResponseBodyTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    setDataFunction,
  }) {
  return (
    <SelectInputBase
      selectOptions={apiFieldTypeConstants.API_RESPONSE_TYPE_SELECT_OPTIONS}
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

ApiResponseBodyTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};
