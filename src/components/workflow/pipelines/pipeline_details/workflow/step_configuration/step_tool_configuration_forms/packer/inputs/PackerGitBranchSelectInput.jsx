import React from "react";
import PropTypes from "prop-types";
import GitBranchInput from "components/common/list_of_values_input/tools/git/GitBranchInput";

function PackerGitBranchSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("defaultBranch", selectedOption);
    setModel({...newDataObject});
  };

  return (
     <GitBranchInput
       fieldName={"defaultBranch"}
       service={model?.getData("type")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       repoId={model?.getData("gitRepositoryID")}
       dataObject={model}
       setDataFunction={setDataFunction}
       setDataObject={setModel}
       disabled={disabled}
     />
  );
}

PackerGitBranchSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default PackerGitBranchSelectInput;