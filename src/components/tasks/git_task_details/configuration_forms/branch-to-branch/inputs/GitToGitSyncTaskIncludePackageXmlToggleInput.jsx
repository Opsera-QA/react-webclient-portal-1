import React from 'react';
import PropTypes from 'prop-types';
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function GitToGitSyncTaskIncludePackageXmlToggleInput({model, setModel, disabled}) {
  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      fieldName={"includePackageXml"}
      disabled={disabled}
    />
  );
}

GitToGitSyncTaskIncludePackageXmlToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitSyncTaskIncludePackageXmlToggleInput;