import React from "react";
import PropTypes from "prop-types";
import AwsBucketSelectInput from "components/common/list_of_values_input/tools/aws/bucket/AwsBucketSelectInput";

function LogsBackupManagementAwsStorageAccountSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
    s3ToolId,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    model.setData("task.region", selectedOption?.regions);
    model.setData("task.awsBucketName", selectedOption?.bucketName);
    setModel({ ...model });
  };

  return (
    <AwsBucketSelectInput
      s3ToolId={s3ToolId}
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

LogsBackupManagementAwsStorageAccountSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  s3ToolId: PropTypes.string,
};

LogsBackupManagementAwsStorageAccountSelectInput.defaultProps = {
  fieldName: "task.awsBucketName",
};

export default LogsBackupManagementAwsStorageAccountSelectInput;