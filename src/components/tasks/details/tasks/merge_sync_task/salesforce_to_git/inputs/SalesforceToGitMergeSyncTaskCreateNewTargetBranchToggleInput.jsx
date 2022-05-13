import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel?.setData(fieldName, newValue);
    newModel?.setData("targetBranch", "");
    newModel?.setData("upstreamBranch", "");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fieldName={"isNewBranch"}
      disabled={disabled}
    />
  );
}

SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskCreateNewTargetBranchToggleInput;
