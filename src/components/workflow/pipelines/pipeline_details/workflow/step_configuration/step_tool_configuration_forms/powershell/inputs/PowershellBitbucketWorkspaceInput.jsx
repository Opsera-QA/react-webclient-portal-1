import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function PowershellBitbucketWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("workspace", selectedOption.key);
    newDataObject.setData("workspaceName", selectedOption.name);
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
     />
  );
}

PowershellBitbucketWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PowershellBitbucketWorkspaceInput;