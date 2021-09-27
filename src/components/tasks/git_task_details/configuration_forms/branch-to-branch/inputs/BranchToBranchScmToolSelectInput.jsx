import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function BranchToBranchScmToolSelectInput({model, setModel, disabled, toolIdentifier}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?._id);
    newModel.setData("gitCredential", selectedOption?.name);
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("autoApprove");
    newModel.setDefaultValue("reviewers");
    newModel.setDefaultValue("reviewerNames");
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
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("workspaceName");
    newModel.setDefaultValue("autoApprove");
    newModel.setDefaultValue("reviewers");
    newModel.setDefaultValue("reviewerNames");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={toolIdentifier}
       toolFriendlyName={"SCM Tool"}
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

BranchToBranchScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  toolIdentifier: PropTypes.string,
};

export default BranchToBranchScmToolSelectInput;