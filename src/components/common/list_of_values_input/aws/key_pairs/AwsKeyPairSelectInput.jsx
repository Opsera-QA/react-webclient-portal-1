import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsKeyPairs from "components/common/list_of_values_input/aws/key_pairs/useGetAwsKeyPairs";

export default function AwsKeyPairSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    awsToolId,
    region,
  }) {
  const {
    keyPairs,
    isLoading,
    error,
  } = useGetAwsKeyPairs(awsToolId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataFunction={setDataFunction}
      setDataObject={setModel}
      selectOptions={keyPairs}
      busy={isLoading}
      disabled={disabled}
      textField={textField}
      error={error}
      valueField={valueField}
      singularTopic={"Key Pair"}
      pluralTopic={"Key Pairs"}
    />
  );
}

AwsKeyPairSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  awsToolId: PropTypes.string,
  region: PropTypes.string,
};

AwsKeyPairSelectInput.defaultProps = {
  fieldName: "keyPair",
};