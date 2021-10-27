import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedJenkinsToolSelectInput
  from "components/common/list_of_values_input/tools/jenkins/RoleRestrictedJenkinsToolSelectInput";

function AzureAcrPushStepJenkinsToolSelectInput({ fieldName, model, setModel, disabled }) {
  const setDataFunction=(fieldName,selectedOption)=>{
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption?._id);
    newDataObject.setData("toolName",selectedOption?.name);
    newDataObject.setData("toolJobName", "");
    newDataObject.setData("toolJobId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("buildType", "docker");
    newDataObject.setData("agentLabels", "");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedJenkinsToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

AzureAcrPushStepJenkinsToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AzureAcrPushStepJenkinsToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default AzureAcrPushStepJenkinsToolSelectInput;
