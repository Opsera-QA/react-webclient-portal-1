import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "components/common/list_of_values_input/tools/repositories/RepositorySelectInput";

function TerraformGitRepositorySelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitRepository", selectedOption?.name);
    newModel.setData("gitRepositoryID", selectedOption?.id);
    newModel.setData("sshUrl", selectedOption?.sshUrl || "");
    newModel.setData("gitUrl", selectedOption?.httpUrl || "");
    setModel({...newModel});
  };

  return (
     <RepositorySelectInput
       fieldName={"gitRepository"}
       service={model?.getData("type")}
       gitToolId={model?.getData("gitToolId")}
       workspace={model?.getData("bitbucketWorkspace")}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

TerraformGitRepositorySelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformGitRepositorySelectInput;