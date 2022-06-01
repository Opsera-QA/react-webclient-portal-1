import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function BlackDuckScmToolSelectInput({model, setModel, className, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("gitRepository");
    newModel.setDefaultValue("gitRepositoryID");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitUrl");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
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
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolIdentifier={model?.getData("type")}
       className={className}
       model={model}
       setModel={setModel}
       disabled={disabled}
       configurationRequired={true}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
     />
  );
}

BlackDuckScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default BlackDuckScmToolSelectInput;
