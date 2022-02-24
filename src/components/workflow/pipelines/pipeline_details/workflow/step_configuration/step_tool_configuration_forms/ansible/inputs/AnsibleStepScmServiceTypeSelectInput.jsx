import React from "react";
import PropTypes from "prop-types";
import SourceControlManagementToolIdentifierSelectInput
  from "components/common/list_of_values_input/tools/source_control/SourceControlManagementToolIdentifierSelectInput";

  function AnsibleStepScmServiceTypeSelectInput({model, fieldName, setModel, disabled}) {
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = {...model};
    await newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };
  
  const clearDataFunction=(fieldName)=>{
    let newModel = {...model};
    newModel.setData(fieldName, "");
    newModel.setData("gitToolId", "");
    newModel.setData("repoId", "");
    newModel.setData("gitUrl", "");
    newModel.setData("sshUrl", "");
    newModel.setData("repository", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  return (
    <SourceControlManagementToolIdentifierSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={fieldName}
      disabled={disabled}
    />
  );
}

AnsibleStepScmServiceTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

AnsibleStepScmServiceTypeSelectInput.defaultProps = {
  fieldName: "service",
};

export default AnsibleStepScmServiceTypeSelectInput;