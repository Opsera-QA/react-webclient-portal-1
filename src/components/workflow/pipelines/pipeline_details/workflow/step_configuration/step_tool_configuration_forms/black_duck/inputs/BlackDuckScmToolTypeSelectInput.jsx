import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SCM_TOOL_LIST = [
  {
    name: "Gitlab",
    value: "gitlab",
  },
  {
    name: "Github",
    value: "github",
  },
  {
    name: "Bitbucket",
    value: "bitbucket",
  },
];

function BlackDuckScmToolTypeSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("type", selectedOption?.value);
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("gitRepositoryID");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"type"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={SCM_TOOL_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Tool Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

BlackDuckScmToolTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default BlackDuckScmToolTypeSelectInput;
