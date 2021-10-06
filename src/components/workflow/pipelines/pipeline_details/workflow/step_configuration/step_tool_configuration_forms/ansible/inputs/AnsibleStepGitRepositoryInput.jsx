import React from "react";
import PropTypes from "prop-types";
import RepositorySelectInput from "../../../../../../../../common/list_of_values_input/tools/git/RepositorySelectInput";

function AnsibleStepGitRepositoryInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModelObject = {...model};
    console.log(selectedOption,'**********');
    newModelObject.setData("repository", selectedOption.name);
    newModelObject.setData("repoId", selectedOption.id);
    newModelObject.setData("projectId", selectedOption.id);
    newModelObject.setData("sshUrl", selectedOption.sshUrl || "");
    newModelObject.setData("gitUrl", selectedOption.httpUrl || "");
    setModel({...newModelObject});
  };
  const clearDataFunction=(fieldName)=>{
    let newModelObject = {...model};
    newModelObject.setData("repository", '');
    newModelObject.setData("repoId", '');
    newModelObject.setData("projectId", '');
    newModelObject.setData("sshUrl", '');
    newModelObject.setData("gitUrl", '');
    setModel({...newModelObject});
  };

  if(!model.getData("service") || !model.getData("gitToolId")) {
    return null;
  }

  return (
     <RepositorySelectInput
       fieldName={"repository"}
       service={model.getData("service")}
       gitToolId={model.getData("gitToolId")}
       workspace={model.getData("workspace")}
       dataObject={model}
       setDataObject={setModel}
       clearDataFunction={clearDataFunction}
       setDataFunction={setDataFunction}
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