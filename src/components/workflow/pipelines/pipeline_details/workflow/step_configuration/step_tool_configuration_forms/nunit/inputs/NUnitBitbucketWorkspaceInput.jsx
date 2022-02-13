import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/workspaces/BitbucketWorkspaceInput";

function NUnitBitbucketWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setWorkspace = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("workspace", selectedOption);
    newDataObject.setData("workspaceName", selectedOption.name);
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

NUnitBitbucketWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default NUnitBitbucketWorkspaceInput;