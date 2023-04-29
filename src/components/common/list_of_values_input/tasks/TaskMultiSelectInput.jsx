import React from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";

export default function TaskMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    textField,
    valueField,
  }) {
  const {
    isLoading,
    error,
    tasks,
  } = useGetTasks(
    ["name", "owner"],
    false,
    10000,
  );

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={tasks}
      busy={isLoading}
      valueField={valueField}
      error={error}
      textField={textField}
      disabled={disabled}
      pluralTopic={"Tasks"}
    />
  );
}

TaskMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

TaskMultiSelectInput.defaultProps = {
  valueField: "_id",
  textField: "name"
};
