import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedNexusToolSelectInput
  from "components/common/list_of_values_input/tools/nexus/RoleRestrictedNexusToolSelectInput";

const NexusStepNexusToolSelectInput = ({model, setModel, disabled, fieldName}) => {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, selectedOption._id);
    newDataObject.setData("repositoryFormat", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("dockerPort", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setModel({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("repositoryFormat", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("dockerPort", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedNexusToolSelectInput
      model={model}
      setModel={setModel}
      fieldName={fieldName}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
};

NexusStepNexusToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  getToolsList: PropTypes.func,
  fieldName: PropTypes.string,
};

NexusStepNexusToolSelectInput.defaultProps = {
  fieldName: "nexusToolConfigId",
};

export default NexusStepNexusToolSelectInput;
