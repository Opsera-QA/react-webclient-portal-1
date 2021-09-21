import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const SCM_TOOL_IDENTIFIERS = [
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

// TODO: We should probably use the base SCM component and pass the setDataFunction and clearDataFunction to it.
function BranchToBranchScmTypeSelectInput({dataObject, setDataObject, disabled, gitTasksDataDto}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("service", selectedOption?.value);
    gitTasksDataDto.setData("tool_identifier", selectedOption?.service);
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("sourceBranch", "");
    newDataObject.setData("autoApprove", false);
    newDataObject.setData("reviewers", []);
    newDataObject.setData("reviewerNames", []);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("service", "");
    gitTasksDataDto.setData("tool_identifier", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("sourceBranch", "");
    newDataObject.setData("autoApprove", false);
    newDataObject.setData("reviewers", []);
    newDataObject.setData("reviewerNames", []);
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      textField={"name"}
      valueField={"value"}
      dataObject={dataObject}
      clearDataFunction={clearDataFunction}
      filter={"contains"}
      selectOptions={SCM_TOOL_IDENTIFIERS}
      fieldName={"service"}
      disabled={disabled}
    />
  );
}

BranchToBranchScmTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  gitTasksDataDto: PropTypes.object,
  disabled: PropTypes.bool,
};

export default BranchToBranchScmTypeSelectInput;