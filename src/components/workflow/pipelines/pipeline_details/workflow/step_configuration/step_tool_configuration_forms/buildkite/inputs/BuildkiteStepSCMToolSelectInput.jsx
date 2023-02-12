import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function BuildkiteSCMToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitToolId", selectedOption?._id);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("branch", "");
    setModel({...newDataObject});
    return;
  };
  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolFriendlyName={"gitToolId"}
       toolIdentifier={model?.getData("service")}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       valueField={"_id"}
       textField={"name"}
       placeholderText={"Select a Tool"}
       disabled={disabled}
     />
  );
}

BuildkiteSCMToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default BuildkiteSCMToolSelectInput;