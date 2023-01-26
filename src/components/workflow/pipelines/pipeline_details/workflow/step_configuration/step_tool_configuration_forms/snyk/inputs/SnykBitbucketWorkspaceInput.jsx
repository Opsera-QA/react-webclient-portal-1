import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function SnykBitbucketWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("workspace", selectedOption.key);
    newDataObject.setData("workspaceName", selectedOption.name);
    newDataObject.setData("repoId", "");
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({...newDataObject});
  };
 
  if (dataObject.getData("service") !== "bitbucket") {
    return <></>;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"workspace"}
       gitToolId={dataObject.getData("gitToolId")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setWorkspace}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

SnykBitbucketWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SnykBitbucketWorkspaceInput;
