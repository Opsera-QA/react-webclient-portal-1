import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsVpcs from "components/common/list_of_values_input/aws/vpcs/useGetAwsVpcs";

export default function AwsVpcSelectInput(
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
    vpcs,
    isLoading,
    error,
  } = useGetAwsVpcs(awsToolId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={vpcs}
      textField={textField}
      valueField={valueField}
      error={error}
      singularTopic={"VPC"}
      pluralTopic={"VPCs"}
      busy={isLoading}
      disabled={disabled}
    />
  );
}

AwsVpcSelectInput.propTypes = {
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

AwsVpcSelectInput.defaultProps = {
  textField: "name",
  valueField: "id",
};
