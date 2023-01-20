import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsEcsInstanceTypes
  from "components/common/list_of_values_input/aws/ecs/instances/useGetAwsEcsInstanceTypes";

export default function AwsEcsInstanceTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    imageType,
  }) {
  const {
    instanceTypes,
    isLoading,
    error,
  } = useGetAwsEcsInstanceTypes(imageType);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={instanceTypes}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      error={error}
      pluralTopic={"Instance Types"}
      singularTopic={"Instance Type"}
      disabled={disabled}
    />
  );
}

AwsEcsInstanceTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  imageType: PropTypes.string,
};

AwsEcsInstanceTypeSelectInput.defaultProps = {
  textField: "key",
  valueField: "value",
};
