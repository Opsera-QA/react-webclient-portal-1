import React from "react";
import PropTypes from "prop-types";
import GitRepositoryInput from "components/common/list_of_values_input/tools/git/GitRepositoryInput";

function TerraformGitRepositoryInput({dataObject, setDataObject, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    console.log(dataObject);
    newDataObject.setData("gitRepository", selectedOption.name);
    newDataObject.setData("gitRepositoryID", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
    setDataObject({...newDataObject});
  };

  return (
     <GitRepositoryInput
       fieldName={"gitRepository"}
       service={dataObject.getData("type")}
       gitToolId={dataObject.getData("gitToolId")}
       workspace={dataObject.getData("bitbucketWorkspace")}
       dataObject={dataObject}
       setDataObject={setDataObject}
       setDataFunction={setRepository}
       disabled={disabled}
     />
  );
}

TerraformGitRepositoryInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerraformGitRepositoryInput;