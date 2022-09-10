import React from "react";
import PropTypes from "prop-types";
import ComboBoxInputBase from "components/common/inputs/combo_box/ComboBoxInputBase";
import { platformSystemParameterConstants } from "components/admin/system_parameters/platformSystemParameter.constants";

export default function PlatformSystemParameterComboBoxInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
    textField,
    valueField,
    allowCreate,
    showLabel,
    setDataFunction,
  }) {
  return (
    <ComboBoxInputBase
      className={className}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      selectOptions={platformSystemParameterConstants.IN_USE_PLATFORM_SYSTEM_PARAMETER_SELECT_OPTIONS}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      allowCreate={allowCreate}
      showLabel={showLabel}
      setDataFunction={setDataFunction}
    />
  );
}

PlatformSystemParameterComboBoxInput.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  allowCreate: PropTypes.bool,
  showLabel: PropTypes.bool,
  setDataFunction: PropTypes.func,
};