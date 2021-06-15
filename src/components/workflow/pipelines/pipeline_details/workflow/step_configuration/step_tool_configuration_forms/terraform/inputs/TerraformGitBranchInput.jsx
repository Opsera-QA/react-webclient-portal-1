import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function TerraformGitBranchInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("defaultBranch", selectedOption);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("defaultBranch", "");
    setDataObject({...newDataObject});
  };

  if (dataObject == null) {
    return null;
  }

  return (
     <GitBranchInput
       fieldName={"defaultBranch"}
       service={dataObject?.getData("type")}
       gitToolId={dataObject?.getData("gitToolId")}
       workspace={dataObject?.getData("bitbucketWorkspace")}
       repoId={dataObject?.getData("gitRepositoryID")}
       dataObject={dataObject}
       setDataFunction={setDataFunction}
       setDataObject={setDataObject}
       disabled={disabled}
     />
  );
}

TerraformGitBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformGitBranchInput;