import React from "react";
import PropTypes from "prop-types";
  import RepositorySelectInput from "../../../../../../../../common/list_of_values_input/tools/git/RepositorySelectInput";

function AnsibleStepGitRepositoryInput({model, setModel, disabled}) {
  const setRepository = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("repository", selectedOption.name);
    newDataObject.setData("repoId", selectedOption.id);
    newDataObject.setData("projectId", selectedOption.id);
    newDataObject.setData("sshUrl", selectedOption.sshUrl || "");
    newDataObject.setData("gitUrl", selectedOption.httpUrl || "");
    setModel({...newDataObject});
  };
  const clearDataFunction=(fieldName)=>{
    let newDataObject = {...model};
    newDataObject.setData("repository", '');
    newDataObject.setData("repoId", '');
    newDataObject.setData("projectId", '');
    newDataObject.setData("sshUrl", '');
    newDataObject.setData("gitUrl", '');
    setModel({...newDataObject});
  };

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={model.getData("service")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       clearDataFunction={clearDataFunction}
       setDataFunction={setRepository}
       disabled={disabled}
     />
  );
}

AnsibleStepGitRepositoryInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default AnsibleStepGitRepositoryInput;