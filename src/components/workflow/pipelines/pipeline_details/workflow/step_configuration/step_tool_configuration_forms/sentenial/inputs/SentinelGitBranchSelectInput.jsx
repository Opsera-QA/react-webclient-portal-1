import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function SentenialGitBranchSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitBranch", selectedOption);
    setModel({...newDataObject});
  };

  return (
     <GitBranchInput
       fieldName={"gitBranch"}
       service={model?.getData("service")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       repoId={model?.getData("repoId")}
       dataObject={model}
       setDataFunction={setDataFunction}
       setDataObject={setModel}
       disabled={disabled}
     />
  );
}

SentenialGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SentenialGitBranchSelectInput;