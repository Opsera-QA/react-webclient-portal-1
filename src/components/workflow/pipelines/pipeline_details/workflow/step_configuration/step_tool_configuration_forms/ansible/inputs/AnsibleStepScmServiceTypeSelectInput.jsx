import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
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
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
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
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("gitBranch", "");
    setModel({...newDataObject});
    return;
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
    // <SelectInputBase
    //   fieldName={"service"}
    //   dataObject={model}
    //   setDataObject={setModel}
    //   selectOptions={SCM_TOOL_LIST}
    //   valueField={"value"}
    //   textField={"name"}
    //   placeholderText={"Select a SCM Tool Type"}
    //   setDataFunction={handleDTOChange}
    //   disabled={disabled}
    //   busy={isLoading}
    // />
  );
}

AnsibleStepScmServiceTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default AnsibleStepScmServiceTypeSelectInput;