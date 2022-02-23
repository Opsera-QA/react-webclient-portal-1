import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function ArgoCdStepBitbucketWorkspaceInput({ gitToolId, fieldName, model, setModel, disabled, className}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("bitbucketWorkspace", selectedOption?.key);
    newModel.setData("bitbucketWorkspaceName", selectedOption?.name);
    setModel({ ...newModel });
  };

  if (model == null || model?.getData("type") !== "bitbucket") {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      className={className}
      disabled={disabled}
      gitToolId={gitToolId}
    />
  );
}

ArgoCdStepBitbucketWorkspaceInput.propTypes = {
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

ArgoCdStepBitbucketWorkspaceInput.defaultProps = {
  fieldName: "bitbucketWorkspaceName",
};

export default ArgoCdStepBitbucketWorkspaceInput;