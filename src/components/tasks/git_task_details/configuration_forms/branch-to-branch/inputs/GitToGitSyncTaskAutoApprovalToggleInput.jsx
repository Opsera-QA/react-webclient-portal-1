import React from 'react';
import PropTypes from 'prop-types';
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function GitToGitSyncTaskAutoApprovalToggleInput({model, setModel, disabled}) {
  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      fieldName={"autoApprove"}
      disabled={disabled}
    />
  );
}

GitToGitSyncTaskAutoApprovalToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitSyncTaskAutoApprovalToggleInput;