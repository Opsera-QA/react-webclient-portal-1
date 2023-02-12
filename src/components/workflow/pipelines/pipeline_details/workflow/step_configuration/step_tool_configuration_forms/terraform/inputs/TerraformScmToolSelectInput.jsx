import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function TerraformScmToolSelectInput({model, setModel, className, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitToolId", selectedOption?._id);
    newDataObject.setData("gitRepository", "");
    newDataObject.setData("gitRepositoryID", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("gitBranch", "");
    setModel({...newDataObject});
  };
  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolIdentifier={model?.getData("type")}
       className={className}
       setDataFunction={setDataFunction}
       model={model}
       setModel={setModel}
       disabled={disabled}
       configurationRequired={true}
     />
  );
}

TerraformScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformScmToolSelectInput;