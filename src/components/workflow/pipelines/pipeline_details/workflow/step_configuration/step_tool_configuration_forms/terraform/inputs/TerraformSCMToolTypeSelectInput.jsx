import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformSCMToolTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {
  
  const handleDTOChange = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption.value);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitRepository", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitFilePath", "");
    newDataObject.setData("bitbucketWorkspace", "");
    newDataObject.setData("bitbucketWorkspaceName", "");
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
       fieldName={"type"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={SCM_TOOL_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Tool Type"}
       setDataFunction={handleDTOChange}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

TerraformSCMToolTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformSCMToolTypeSelectInput;