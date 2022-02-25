import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {toolIdentifierConstants} from "components/admin/tools/tool_identifier/toolIdentifier.constants";

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
  // {
  //   name: "Azure DevOps",
  //   value: toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS,
  // },
];

// TODO: We should probably use the base SCM component and pass the setDataFunction and clearDataFunction to it.
function ArgoRepositoryScmTypeSelectInput({dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("service", selectedOption?.value);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData("service", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("workspace", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      textField={"name"}
      valueField={"value"}
      dataObject={dataObject}
      selectOptions={SCM_TOOL_IDENTIFIERS}
      fieldName={"service"}
      disabled={disabled}
    />
  );
}

ArgoRepositoryScmTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ArgoRepositoryScmTypeSelectInput;