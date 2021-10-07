import React from "react";
import PropTypes from "prop-types";
import ScmToolIdentifierSelectInput
  from "components/common/list_of_values_input/tools/source_control/ScmToolIdentifierSelectInput";

  function AnsibleStepScmServiceTypeSelectInput({model, setModel, disabled}) {
  
  const setDataFunction = async (fieldName, selectedOption) => {
    let newDataObject = {...model};
    await newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    setModel({...newDataObject});
    return;
  };
  const clearDataFunction=(fieldName)=>{
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    setModel({...newDataObject});
  };

  return (
    <ScmToolIdentifierSelectInput
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      fieldName={"service"}
      disabled={disabled}
    />
  );
}

AnsibleStepScmServiceTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default AnsibleStepScmServiceTypeSelectInput;