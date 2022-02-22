import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function ScmWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {    
    let newDataObject = {...dataObject};    
    newDataObject.setData("workspace", selectedOption.key);
    newDataObject.setData("workspaceName", selectedOption.name);
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("reviewerName", "");
    newDataObject.setData("reviewerId", "");
    setDataObject({...newDataObject});
  };

  const clearWorkspace = (fieldName) => {
    let newDataObject = {...dataObject};    
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("reviewerName", "");
    newDataObject.setData("reviewerId", "");
    setDataObject({...newDataObject});
  };

  if (dataObject.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"workspaceName"}
       gitToolId={dataObject.getData("toolId")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setWorkspace}
       clearDataFunction={clearWorkspace}
       disabled={disabled}
     />
  );
}

ScmWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ScmWorkspaceInput;