import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function AnsibleStepGitBranchInput({model, setModel, disabled}) {
  
  const clearDataFunction=(fieldName)=>{
    let newDataObject = {...model};
    newDataObject.setData("defaultBranch", '');
    setModel({...newDataObject});
  };

  if(!model.getData("service") || !model.getData("gitToolId") || !model.getData("workspace") || !model.getData("repoId")) {
    return null;
  }

  return (
     <GitBranchInput
       fieldName={"defaultBranch"}
       service={model.getData("service")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       repoId={model.getData("repoId")}
       dataObject={model}
       clearDataFunction={clearDataFunction}
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