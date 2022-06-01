import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function BlackDuckGitBranchInput({model, setModel, disabled}) {
  return (
     <GitBranchInput
       fieldName={"defaultBranch"}
       service={model.getData("type")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       repoId={model.getData("gitRepositoryID")}
       dataObject={model}
       setDataObject={setModel}
       disabled={disabled}
     />
  );
}

BlackDuckGitBranchInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default BlackDuckGitBranchInput;
