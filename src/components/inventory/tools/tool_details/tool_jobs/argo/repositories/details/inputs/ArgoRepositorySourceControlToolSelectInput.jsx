import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function ArgoRepositorySourceControlToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitToolId", selectedOption?._id);
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("workspace", "");
    setModel({...newDataObject});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={model?.getData("service")}
       toolFriendlyName={"Source Control Tool"}
       fieldName={"gitToolId"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
     />
  );
}

ArgoRepositorySourceControlToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoRepositorySourceControlToolSelectInput;