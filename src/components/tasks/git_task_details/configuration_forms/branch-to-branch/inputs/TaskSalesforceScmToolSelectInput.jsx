import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function TaskSalesforceScmToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitToolId", selectedOption?.id);
    newModel.setData("gitCredential", selectedOption?.name);
    newModel.setData("gitUrl");
    newModel.setData("sshUrl");
    newModel.setData("projectId");
    newModel.setData("repository");
    newModel.setData("gitBranch");
    newModel.setData("defaultBranch");
    newModel.setData("workspace");
    newModel.setData("sourceBranch");
    newModel.setData("workspaceName");
    newModel.setData("autoApprove");
    newModel.setData("reviewers");
    newModel.setData("reviewerNames");
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
       toolType={model?.getData("service")}
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

TaskSalesforceScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TaskSalesforceScmToolSelectInput;