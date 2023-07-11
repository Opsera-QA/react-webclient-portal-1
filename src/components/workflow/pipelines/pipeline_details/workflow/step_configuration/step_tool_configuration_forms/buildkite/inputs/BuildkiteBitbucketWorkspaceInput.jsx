import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function BuildkiteBitbucketWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("workspace", selectedOption.key);
    newDataObject.setData("workspaceName", selectedOption.name);
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("branch", "");
    setDataObject({...newDataObject});
  };

  if (dataObject.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
    <BitbucketWorkspaceInput
      fieldName={"workspaceName"}
      gitToolId={dataObject.getData("gitToolId")}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setWorkspace}
      disabled={disabled}
    />
  );
}

BuildkiteBitbucketWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BuildkiteBitbucketWorkspaceInput;