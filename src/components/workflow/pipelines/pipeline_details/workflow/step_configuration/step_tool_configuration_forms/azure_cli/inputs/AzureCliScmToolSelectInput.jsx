import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function AzureCliScmToolSelectInput({model, setModel, className, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("gitToolId", selectedOption?._id);
    newDataObject.setData("gitRepository", "");
    newDataObject.setData("gitRepositoryID", "");
    newDataObject.setData("bitbucketWorkspace", "");
    newDataObject.setData("bitbucketWorkspaceName", "");
    newDataObject.setData("defaultBranch", "");
    setModel({...newDataObject});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolIdentifier={model?.getData("type")}
       setDataFunction={setDataFunction}
       className={className}
       model={model}
       setModel={setModel}
       disabled={disabled}
       configurationRequired={true}
     />
  );
}

AzureCliScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default AzureCliScmToolSelectInput;
