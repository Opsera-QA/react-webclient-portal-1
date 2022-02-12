import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function GitToGitSyncTaskBitbucketWorkspaceSelectInput({model, setModel, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("workspace", selectedOption.key);
    newDataObject.setData("workspaceName", selectedOption.name);
    setModel({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...model};
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    setModel({...newDataObject});
  };

  if (model?.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"workspace"}
       gitToolId={model?.getData("gitToolId")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setWorkspace}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

GitToGitSyncTaskBitbucketWorkspaceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default GitToGitSyncTaskBitbucketWorkspaceSelectInput;
