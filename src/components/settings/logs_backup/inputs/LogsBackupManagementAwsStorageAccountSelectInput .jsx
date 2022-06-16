import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function LogsBackupManagementAwsStorageAccountSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
    awsStorageAccounts
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    const task = model?.getData("task");
    task.region = selectedOption?.regions;
    task.awsBucketName = selectedOption?.bucketName;
    model.setData("task", task);
    setModel({...model});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      selectOptions={awsStorageAccounts}
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
  awsStorageAccounts: PropTypes.array
};

LogsBackupManagementAwsStorageAccountSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name",
  fieldName: "task.awsBucketName",
};

export default LogsBackupManagementAwsStorageAccountSelectInput;