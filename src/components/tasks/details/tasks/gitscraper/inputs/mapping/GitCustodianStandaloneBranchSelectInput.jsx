import React from "react";
import PropTypes from "prop-types";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const BRANCH_OPTIONS = [
  "master",
  "main",
  "default",
];

function GitCustodianStandaloneBranchSelectInput({ disabled, value, setDataFunction }) {

  return (    
    <StandaloneSelectInput
      selectOptions={BRANCH_OPTIONS}
      value={value}      
      placeholderText="Select Branch"
      setDataFunction={(data) => setDataFunction(data)}
    />
  );
}

GitCustodianStandaloneBranchSelectInput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.string,
  setDataFunction: PropTypes.func,
};

export default GitCustodianStandaloneBranchSelectInput;
