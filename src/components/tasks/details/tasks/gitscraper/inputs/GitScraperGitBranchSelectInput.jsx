import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function GitScraperGitBranchSelectInput({model, setModel, disabled, service, gitToolId}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitBranch", selectedOption);
    setModel({...newDataObject});
  };

  return (
     <GitBranchInput
       fieldName={"gitBranch"}
       service={service}
       gitToolId={gitToolId}
       workspace={model?.getData("workspace")}
       repoId={model?.getData("repoId")}
       dataObject={model}
       setDataFunction={setDataFunction}
       setDataObject={setModel}
       disabled={disabled}
       multi={true}
     />
  );
}

GitScraperGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  service: PropTypes.string,
  gitToolId: PropTypes.string
};

export default GitScraperGitBranchSelectInput;