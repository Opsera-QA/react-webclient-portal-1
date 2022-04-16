import React from "react";
import PropTypes from "prop-types";
import MergeSyncTaskJobTypeSelectInput
  from "components/common/list_of_values_input/tasks/type/merge_sync_task/MergeSyncTaskJobTypeSelectInput";

function MergeSyncTaskMergeTypeSelectInput({
  model,
  setModel,
}) {
  const setDataFunction = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("jobType", selectedOption.value);
    newModel.setDefaultValue("git");
    newModel.setDefaultValue("sfdc");
    setModel({ ...newModel });
  };

  if (model?.getData("service") !== "bitbucket") {
    return null;
  }

  return (
    <MergeSyncTaskJobTypeSelectInput
      fieldName={"jobType"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={model?.isNew() !== true}
    />
  );
}

MergeSyncTaskMergeTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default MergeSyncTaskMergeTypeSelectInput;
