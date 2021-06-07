import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SfdcGitBranchInput({dataObject, setDataObject, disabled}) {
  const setBranch = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    // newDataObject.setData("branch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("branch", selectedOption);
    setDataObject({...newDataObject});
  };

  const clearData = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("branch", "");
    setDataObject({...newDataObject});
  };

  return (
     <GitBranchInput
       fieldName={"gitBranch"}
       service={dataObject.getData("service")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("workspace")}
       repoId={dataObject.getData("projectId")}
       dataObject={dataObject}
       setDataFunction={setBranch}
       setDataObject={setDataObject}
       disabled={disabled}
       clearDataFunction={clearData}
     />
  );
}

SfdcGitBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SfdcGitBranchInput;
