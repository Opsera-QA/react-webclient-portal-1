import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import useGetAwsIamRoles from "components/common/list_of_values_input/aws/iam_roles/useGetAwsIamRoles";

export default function AwsIamRoleSelectInput(
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
    awsIamRoles,
    isLoading,
    error,
  } = useGetAwsIamRoles(awsToolId, region);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={awsIamRoles}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      disabled={disabled}
      error={error}
      singularTopic={"IAM Role"}
      pluralTopic={"IAM Roles"}
    />
  );
}

AwsIamRoleSelectInput.propTypes = {
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

AwsIamRoleSelectInput.defaultProps = {
  fieldName: "ecsServiceExecutionRoleArn",
  textField: "roleName",
  valueField: "arn",
};
