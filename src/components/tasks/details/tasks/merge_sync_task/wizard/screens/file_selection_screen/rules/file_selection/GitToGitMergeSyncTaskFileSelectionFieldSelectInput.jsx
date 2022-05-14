import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const ruleFields = [
  {value: "commitID", text: "Commit ID"},
  {value: "commitAction", text: "Commit Action"},
  // {value: "committedTime", text: "Commit Time"},
  {value: "committedBy", text: "Committed By"},
  {value: "committedFile", text: "File Name"},
];

function GitToGitMergeSyncTaskFileSelectionFieldSelectInput({fieldName, className, model, setModel, disabled, showLabel}) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel.setData(fieldName, newValue?.value);
    newModel.setData("values", []);
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={ruleFields}
      placeholderText={"Select a Field"}
      valueField={"value"}
      textField={"text"}
      disabled={disabled}
      showLabel={showLabel}
    />
  );
}

GitToGitMergeSyncTaskFileSelectionFieldSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showLabel: PropTypes.bool
};

GitToGitMergeSyncTaskFileSelectionFieldSelectInput.defaultProps = {
  fieldName: "field",
};

export default GitToGitMergeSyncTaskFileSelectionFieldSelectInput;