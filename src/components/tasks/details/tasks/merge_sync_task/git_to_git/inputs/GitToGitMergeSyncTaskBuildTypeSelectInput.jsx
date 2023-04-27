import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const BUILD_TYPES = [
  {
    text: "SFDX",
    value: "sfdx",
  },
  {
    text: "Ant",
    value: "ant",
  },  
];

function GitToGitMergeSyncTaskBuildTypeSelectInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
  }) {
  return (
    <SelectInputBase
      dataObject={model}
      setDataObject={setModel}
      textField={"text"}
      valueField={"value"}
      selectOptions={BUILD_TYPES}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

GitToGitMergeSyncTaskBuildTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default GitToGitMergeSyncTaskBuildTypeSelectInput;
