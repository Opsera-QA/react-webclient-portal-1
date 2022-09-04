import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { platformSystemParameterConstants } from "components/admin/system_parameters/platformSystemParameter.constants";

export default function PlatformSystemParameterTypeSelectInputBase(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={platformSystemParameterConstants.PLATFORM_SYSTEM_PARAMETER_TYPE_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      valueField={"value"}
      textField={"text"}
      singularTopic={"System Parameter Type"}
      disabled={disabled}
    />
  );
}

PlatformSystemParameterTypeSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};