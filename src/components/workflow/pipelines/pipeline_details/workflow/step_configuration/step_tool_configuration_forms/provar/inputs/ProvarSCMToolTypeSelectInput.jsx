import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ProvarSCMToolTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {
  
  const handleDTOChange = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({...newDataObject});
    return;
  };

  const SCM_TOOL_LIST = [
    {
      name: "Gitlab",
      value: "gitlab",
    },
    {
      name: "Github",
      value: "github",
    },
    {
      name: "Bitbucket",
      value: "bitbucket",
    },
  ];

  return (
    
     <SelectInputBase
       fieldName={"service"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={SCM_TOOL_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a SCM Tool Type"}
       setDataFunction={handleDTOChange}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

ProvarSCMToolTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ProvarSCMToolTypeSelectInput;