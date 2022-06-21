import React, { useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {AuthContext} from "contexts/AuthContext";
import {
  NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS,
  PRODUCTION_TASK_TYPE_SELECT_OPTIONS,
} from "components/tasks/task.types";

function TaskTypeSelectInputBase({ fieldName, model, setModel, isLoading, setDataFunction, disabled }) {
  const { featureFlagHideItemInProd } = useContext(AuthContext);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={
        featureFlagHideItemInProd() !== false
          ? PRODUCTION_TASK_TYPE_SELECT_OPTIONS
          : NON_PRODUCTION_TASK_TYPE_SELECT_OPTIONS
      }
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={"Select Task Type"}
      valueField={"value"}
      textField={"text"}
      groupBy={"category"}
      disabled={disabled}
    />
  );
}

TaskTypeSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  isLoading: PropTypes.bool,
};

TaskTypeSelectInputBase.defaultProps = {
  fieldName: "type",
};

export default TaskTypeSelectInputBase;