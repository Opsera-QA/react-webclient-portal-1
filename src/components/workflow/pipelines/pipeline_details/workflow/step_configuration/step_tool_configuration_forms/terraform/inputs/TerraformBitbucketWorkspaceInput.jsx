import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/BitbucketWorkspaceInput";

function TerraformBitbucketWorkspaceInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("bitbucketWorkspace", selectedOption.key);
    newDataObject.setData("bitbucketWorkspaceName", selectedOption.name);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("bitbucketWorkspace", "");
    newDataObject.setData("bitbucketWorkspaceName", "");
    setDataObject({...newDataObject});
  };

  if (dataObject == null || dataObject?.getData("type") !== "bitbucket") {
    return null;
  }

  return (
     <BitbucketWorkspaceInput
       fieldName={"bitbucketWorkspaceName"}
       gitToolId={dataObject?.getData("gitToolId")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       clearDataFunction={clearDataFunction}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

TerraformBitbucketWorkspaceInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformBitbucketWorkspaceInput;