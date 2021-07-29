import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function CoverityGitBranchInput({dataObject, setDataObject, disabled}) {
  const setBranch = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("branch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    setDataObject({...newDataObject});
  };
  return (
    <GitBranchInput
      fieldName={"gitBranch"}
      service={dataObject.getData("service")}
      gitToolId={dataObject.getData("gitToolId")}
      workspace={dataObject.getData("workspace")}
      repoId={dataObject.getData("repoId")}
      dataObject={dataObject}
      setDataFunction={setBranch}
      setDataObject={setDataObject}
      disabled={disabled}
    />
  );
}

CoverityGitBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CoverityGitBranchInput;