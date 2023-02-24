import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useGetRegistryTools from "hooks/tools/useGetRegistryTools";

export default function ToolMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const {
    isLoading,
    error,
    registryTools,
  } = useGetRegistryTools(
    undefined,
    undefined,
    10000,
    false,
  );

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={registryTools}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      disabled={disabled}
      pluralTopic={"Tools"}
    />
  );
}

ToolMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolMultiSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name"
};
