import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function SnykScmToolSelectInput({model, setModel, disabled, service}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?._id);
    newModel.setData("gitCredential", selectedOption?.name);
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("gitBranch");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("gitBranch");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={service}
       toolFriendlyName={"SCM"}
       fieldName={"gitToolId"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SnykScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  service: PropTypes.string,
};

export default SnykScmToolSelectInput;