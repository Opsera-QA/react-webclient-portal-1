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

function TerraformScmToolTypeSelectInput({model, setModel, isLoading, disabled}) {
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = {...model};
    await newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("gitRepository", "");
    newModel.setData("repositoryName", "");
    newModel.setData("defaultBranch", "");
    newModel.setData("gitFilePath", "");
    newModel.setData("bitbucketWorkspace", "");
    newModel.setData("bitbucketWorkspaceName", "");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"type"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={TERRAFORM_SCM_TOOL_LIST}
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
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformScmToolTypeSelectInput;