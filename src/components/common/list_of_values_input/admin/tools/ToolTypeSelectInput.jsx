import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetToolTypes from "components/common/list_of_values_input/admin/tools/types/useGetToolTypes";

export default function ToolTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    includeInactive,
    requireUserEnable,
  }) {
  const {
    isLoading,
    toolTypes,
    error,
  } = useGetToolTypes(includeInactive);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={toolTypes}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      error={error}
      requireUserEnable={requireUserEnable}
    />
  );
}

ToolTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  includeInactive: PropTypes.bool,
  requireUserEnable: PropTypes.bool,
};

ToolTypeSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name",
};