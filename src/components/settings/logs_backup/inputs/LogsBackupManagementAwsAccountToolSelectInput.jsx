import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";

function LogsBackupManagementAwsAccountToolSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("task.s3ToolId", selectedOption?._id);
    setModel({...model});
  };

  return (
    <RoleRestrictedAwsAccountToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

LogsBackupManagementAwsAccountToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

LogsBackupManagementAwsAccountToolSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "s3ToolId",
};

export default LogsBackupManagementAwsAccountToolSelectInput;