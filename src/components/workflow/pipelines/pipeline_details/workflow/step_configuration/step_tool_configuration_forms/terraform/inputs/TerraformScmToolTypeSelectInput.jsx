import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const TERRAFORM_SCM_TOOL_LIST = [
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

function TerraformScmToolTypeSelectInput({fieldName, dataObject, setDataObject, isLoading, disabled}) {
  
  const setDataFunction = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption?.value);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitRepository", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitFilePath", "");
    newDataObject.setData("bitbucketWorkspace", "");
    newDataObject.setData("bitbucketWorkspaceName", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = async () => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitRepository", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitFilePath", "");
    newDataObject.setData("bitbucketWorkspace", "");
    newDataObject.setData("bitbucketWorkspaceName", "");
    setDataObject({...newDataObject});
  };

  return (
    
     <SelectInputBase
       fieldName={fieldName}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={TERRAFORM_SCM_TOOL_LIST}
       clearDataFunction={clearDataFunction}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Tool Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

TerraformScmToolTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

TerraformScmToolTypeSelectInput.defaultProps = {
  fieldName: "type"
};

export default TerraformScmToolTypeSelectInput;