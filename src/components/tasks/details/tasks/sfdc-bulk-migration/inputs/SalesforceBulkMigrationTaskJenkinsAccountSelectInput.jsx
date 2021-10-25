import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsAccountSelectInput from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsAccountSelectInput";

function SalesforceBulkMigrationTaskJenkinsAccountSelectInput({model, setModel, taskModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("gitCredential", selectedOption?.gitCredential);
    newModel.setData("gitToolId", selectedOption?.toolId);
    newModel.setData("service", selectedOption?.service);
    // save the tool identifier to the parent obj
    taskModel.setData("tool_identifier", selectedOption?.service);
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl",);
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("service");
    // save the tool identifier to the parent obj
    taskModel.setDefaultValue("tool_identifier");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("defaultBranch");
    newModel.setDefaultValue("sourceBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedJenkinsAccountSelectInput
       fieldName={"gitCredential"}
       jenkinsToolId={model?.getData("toolConfigId")}
       requireConfiguration={true}
       dataObject={model}
       setDataObject={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SalesforceBulkMigrationTaskJenkinsAccountSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  taskModel: PropTypes.object,
};

export default SalesforceBulkMigrationTaskJenkinsAccountSelectInput;
