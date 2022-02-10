import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ParameterVaultEnabledToggle(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, value) => {
    const newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setDefaultValue("value");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      setDataObject={setModel}
      dataObject={model}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

ParameterVaultEnabledToggle.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

ParameterVaultEnabledToggle.defaultProps = {
  fieldName: "vaultEnabled",
};

export default ParameterVaultEnabledToggle;