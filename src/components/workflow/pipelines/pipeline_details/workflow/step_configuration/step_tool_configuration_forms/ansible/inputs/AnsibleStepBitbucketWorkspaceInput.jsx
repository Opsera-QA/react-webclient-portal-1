import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function AnsibleStepBitbucketWorkspaceInput({ gitToolId, fieldName, model, setModel, disabled, className}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = model;
    newModel.setData("workspace", selectedOption?.key);
    newModel.setData("workspaceName", selectedOption?.name);
    setModel({ ...newModel });
  };

  console.log(model?.getData("service"));
  if (model == null || model?.getData("service") !== "bitbucket") {
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

AnsibleStepBitbucketWorkspaceInput.propTypes = {
  gitToolId: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

AnsibleStepBitbucketWorkspaceInput.defaultProps = {
  fieldName: "workspaceName",
};

export default AnsibleStepBitbucketWorkspaceInput;