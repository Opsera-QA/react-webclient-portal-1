import React from "react";
import PropTypes from "prop-types";
import SelectedTaskList from "components/common/list_of_values_input/tasks/selection/SelectedTaskList";

export default function TaskListFieldBase(
  {
    model,
    fieldName,
    customTitle,
  }) {
  return (
    <SelectedTaskList
      model={model}
      fieldName={fieldName}
      currentData={model?.getArrayData(fieldName)}
      disabled={true}
      customTitle={customTitle}
      className={"my-2"}
    />
  );
}

TaskListFieldBase.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
};
