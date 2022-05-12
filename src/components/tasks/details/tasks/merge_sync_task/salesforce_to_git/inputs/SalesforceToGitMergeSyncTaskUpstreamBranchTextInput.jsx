import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function SalesforceToGitMergeSyncTaskUpstreamBranchTextInput({
  model,
  setModel,
  disabled,
}) {
  return (
    <TextInputBase
      fieldName={"upstreamBranch"}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      visible={model?.getData("isNewBranch") === true}
    />
  );
}

SalesforceToGitMergeSyncTaskUpstreamBranchTextInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskUpstreamBranchTextInput;
