import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function AnsibleStepGitBranchInput({model, setModel, disabled}) {
  const setBranch = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    // newDataObject.setData("branch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    setModel({...newDataObject});
  };
  return (
     <GitBranchInput
       fieldName={"defaultBranch"}
       service={model.getData("service")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       repoId={model.getData("repoId")}
       dataObject={model}
       setDataFunction={setBranch}
       setDataObject={setModel}
       disabled={disabled}
     />
  );
}

AnsibleStepGitBranchInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AnsibleStepGitBranchInput;