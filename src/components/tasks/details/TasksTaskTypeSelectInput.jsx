import React from "react";
import PropTypes from "prop-types";
import TaskTypeSelectInputBase from "components/common/list_of_values_input/tasks/TaskTypeSelectInputBase";

function TasksTaskTypeSelectInput({ fieldName, model, setModel, setTaskConfigurationModel, disabled, placeholderText }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("type", selectedOption?.value);
    newModel.setDefaultValue("configuration");
    setTaskConfigurationModel(undefined);
    setModel({...newModel});
  };


  return (
    <TaskTypeSelectInputBase
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      placeholderText={placeholderText}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
    />
  );
}

TasksTaskTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  placeholderText: PropTypes.string,
  setTaskConfigurationModel: PropTypes.func,
  disabled: PropTypes.bool,
};

TasksTaskTypeSelectInput.defaultProps = {
  fieldName: "type",
  placeholderText: "Select Task Type"
};

export default TasksTaskTypeSelectInput;