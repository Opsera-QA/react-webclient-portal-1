import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsLogGroups from "components/common/list_of_values_input/tools/aws/log_groups/useGetAwsLogGroups";

export default function AwsLogGroupSelectInput(
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
    isLoading,
    awsLogGroups,
    error,
  } = useGetAwsLogGroups(awsToolId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={awsLogGroups}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      error={error}
      singularTopic={"Log Group"}
      pluralTopic={"Log Groups"}
      disabled={disabled}
    />
  );
}

AwsLogGroupSelectInput.propTypes = {
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

AwsLogGroupSelectInput.defaultProps = {
  textField: "logGroupName",
  valueField: "logGroupName",
};
