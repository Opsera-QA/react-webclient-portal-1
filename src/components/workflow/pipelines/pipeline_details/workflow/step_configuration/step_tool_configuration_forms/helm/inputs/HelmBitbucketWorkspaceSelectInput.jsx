import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function HelmBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("bitbucketWorkspace", selectedOption?.key);
    newModel.setData("bitbucketWorkspaceName", selectedOption?.name);
    newModel.setData("defaultBranch", "");
    setModel({...newModel});
  };

  if (model?.getData("type") !== "bitbucket") {
    return <></>;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"bitbucketWorkspaceName"}
      gitToolId={model?.getData("gitToolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

HelmBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default HelmBitbucketWorkspaceSelectInput;