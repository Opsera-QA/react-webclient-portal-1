import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function TerrascanJenkinsToolSelectInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...model};
    newDataObject.setData("toolConfigId", selectedOption._id);
    newDataObject.setData("toolName", selectedOption.name);
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("type", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("autoScaleEnable", selectedOption?.configuration?.autoScaleEnable === true);
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={"toolConfigId"}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

TerrascanJenkinsToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TerrascanJenkinsToolSelectInput;