import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useGetAwsSubnets from "components/common/list_of_values_input/aws/subnets/useGetAwsSubnets";

export default function AwsSubnetMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    textField,
    valueField,
    awsToolId,
    vpcId,
  }) {
  const {
    subnets,
    isLoading,
    error,
  }= useGetAwsSubnets(awsToolId, vpcId);

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={subnets}
      error={error}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      setDataFunction={setDataFunction}
      disabled={disabled}
      pluralTopic={"Subnets"}
    />
  );
}

AwsSubnetMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  vpcId: PropTypes.string,
  awsToolId: PropTypes.string,
};

AwsSubnetMultiSelectInput.defaultProps = {
  fieldName: "ecsServiceSubnets",
  textField: "textField",
  valueField: "subnetId",
};
