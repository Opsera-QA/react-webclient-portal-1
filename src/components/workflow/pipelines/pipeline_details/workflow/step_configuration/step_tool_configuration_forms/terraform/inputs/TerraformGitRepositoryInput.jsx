import React from "react";
import PropTypes from "prop-types";
import GitRepositoryInput from "components/common/list_of_values_input/tools/git/GitRepositoryInput";

function TerraformGitRepositoryInput({model, setModel, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitRepository", selectedOption?.name);
    newModel.setData("gitRepositoryID", selectedOption?.id);
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    newModel.setData("gitUrl", selectedOption?.httpUrl || "");
    setModel({...newModel});
  };

  return (
     <GitRepositoryInput
       fieldName={"gitRepository"}
       service={model?.getData("type")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setRepository}
       disabled={disabled}
     />
  );
}

TerraformGitRepositoryInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformGitRepositoryInput;