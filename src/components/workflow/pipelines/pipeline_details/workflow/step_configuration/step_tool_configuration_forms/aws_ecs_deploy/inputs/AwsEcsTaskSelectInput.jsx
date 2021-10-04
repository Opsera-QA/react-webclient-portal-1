import React from "react";
import PropTypes from "prop-types";
import TaskSelectInputBase from "components/common/list_of_values_input/tasks/TaskSelectInputBase";

function AwsEcsTaskSelectInput({fieldName, model, setModel, setDataFunction, disabled, textField, valueField }) {
  return (
    <TaskSelectInputBase
      fieldName={fieldName}
      textField={textField}
      valueField={valueField}
      disabled={disabled}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fields={["name", "_id"]}
      type={"ecs_service_creation"}
      placeholderText={"Select a Service Template"}
    />
  );
}

AwsEcsTaskSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
  setDataFunction: PropTypes.func,

};

AwsEcsTaskSelectInput.defaultProps = {
  fieldName: "ecsServiceTaskId",
  textField: "name",
  valueField: "_id"
};

export default AwsEcsTaskSelectInput;
