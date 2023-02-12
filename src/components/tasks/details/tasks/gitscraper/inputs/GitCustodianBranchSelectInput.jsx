import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const BRANCH_OPTIONS = [
  "master",
  "main",
  "default",
];

function GitCustodianBranchSelectInput({ model, setModel, disabled, fieldName }) {

  if (!model?.getData("scanOnlyBranch")) {
    return null;
  }

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={BRANCH_OPTIONS}
      disabled={disabled}
    />
  );
}

GitCustodianBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default GitCustodianBranchSelectInput;
