import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

const ScmToScmMigrationTaskBitbucketWorkspaceSelectInput = ({
  model,
  setModel,
  disabled,
}) => {
  const setWorkspace = (fieldName, selectedOption) => {
    const newModel = { ...model };
    newModel.setData("sourceWorkspace", selectedOption?.key);
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };

  const clearData = () => {
    const newModel = { ...model };
    newModel.setDefaultValue("sourceWorkspace");
    newModel.setDefaultValue("repositoryMapList");
    setModel({ ...newModel });
  };

  if (model?.getData("sourceScmType") !== "bitbucket") {
    return null;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"sourceWorkspace"}
      gitToolId={model?.getData("sourceGitToolId")}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setWorkspace}
      disabled={disabled}
      clearDataFunction={clearData}
    />
  );
};

ScmToScmMigrationTaskBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ScmToScmMigrationTaskBitbucketWorkspaceSelectInput;
