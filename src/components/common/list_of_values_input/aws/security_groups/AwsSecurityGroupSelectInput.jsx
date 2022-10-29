import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsSecurityGroups
  from "components/common/list_of_values_input/aws/security_groups/useGetAwsSecurityGroups";

export default function AwsSecurityGroupSelectInput(
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
    securityGroups,
    isLoading,
    error,
  } = useGetAwsSecurityGroups(awsToolId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={securityGroups}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      error={error}
      singularTopic={"Security Group"}
      pluralTopic={"Security Groups"}
      disabled={disabled}
    />
  );
}

AwsSecurityGroupSelectInput.propTypes = {
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

AwsSecurityGroupSelectInput.defaultProps = {
  textField: "groupName",
  valueField: "groupId",
};