import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {
  MERGE_SYNC_TASK_JOB_TYPE_SELECT_OPTIONS
} from "components/common/list_of_values_input/tasks/type/merge_sync_task/mergeSyncTaskJob.types";

function MergeSyncTaskJobTypeSelectInput({
  model,
  setModel,
  fieldName,
  setDataFunction,
  disabled,
}) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={MERGE_SYNC_TASK_JOB_TYPE_SELECT_OPTIONS}
      setDataFunction={setDataFunction}
      placeholderText={"Select Merge Type"}
      valueField={"value"}
      textField={"text"}
      groupBy={"category"}
      disabled={disabled}
    />
  );
}

MergeSyncTaskJobTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
};

export default MergeSyncTaskJobTypeSelectInput;
