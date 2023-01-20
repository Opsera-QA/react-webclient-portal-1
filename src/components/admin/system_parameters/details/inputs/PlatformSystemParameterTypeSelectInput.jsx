import React from "react";
import PropTypes from "prop-types";
import platformSystemParameterConstants
  from "@opsera/definitions/constants/platform/system_parameters/platformSystemParameter.constants";
import PlatformSystemParameterTypeSelectInputBase
  from "components/common/list_of_values_input/admin/platform/system-parameters/PlatformSystemParameterTypeSelectInputBase";

export default function PlatformSystemParameterTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption?.value);
    model?.setData("value", platformSystemParameterConstants.getInitialValueForParameterType(selectedOption?.value));
    setModel({...model});
  };

  return (
    <PlatformSystemParameterTypeSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      singularTopic={"System Parameter Type"}
      disabled={disabled}
    />
  );
}

PlatformSystemParameterTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
};

PlatformSystemParameterTypeSelectInput.defaultProps = {
  fieldName: "type",
};