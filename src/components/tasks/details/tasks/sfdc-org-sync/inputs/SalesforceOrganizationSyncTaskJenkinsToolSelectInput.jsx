import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function SalesforceOrganizationSyncTaskJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolName", selectedOption?.name);
    newModel.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable);
    newModel.setDefaultValue("toolJobName");
    newModel.setDefaultValue("toolJobId");
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    setModel({...newModel});
  };

  const clearDataFunction = () => {
    let newModel = {...model};
    newModel.setDefaultValue("toolConfigId");
    newModel.setDefaultValue("toolName");
    newModel.setDefaultValue("autoScaleEnable");
    newModel.setDefaultValue("toolJobName");
    newModel.setDefaultValue("toolJobId");
    newModel.setDefaultValue("gitToolId");
    newModel.setDefaultValue("gitUrl");
    newModel.setDefaultValue("sshUrl");
    newModel.setDefaultValue("gitCredential");
    newModel.setDefaultValue("projectId");
    newModel.setDefaultValue("repository");
    newModel.setDefaultValue("gitBranch");
    newModel.setDefaultValue("workspace");
    newModel.setDefaultValue("workspaceName");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedJenkinsToolSelectInput
       fieldName={"toolConfigId"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
     />
  );
}

SalesforceOrganizationSyncTaskJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceOrganizationSyncTaskJenkinsToolSelectInput;
