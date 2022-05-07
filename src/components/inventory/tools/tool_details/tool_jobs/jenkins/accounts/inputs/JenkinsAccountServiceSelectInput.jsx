import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TOOL_TYPES = [
  { value: "azure-devops", label: "Azure DevOps" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "coverity", label: "Coverity"},
  { value: "github", label: "Github" },
  { value: "github-deploykey", label: "Github Deploy Key" },
  { value: "gitlab", label: "Gitlab" },
];

function JenkinsAccountServiceSelectInput({ fieldName, dataObject, setDataObject, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, selectedOption?.value);
    newDataObject.setData("credentailsToolId", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("accountUserName", "");
    newDataObject.setData("toolId", "");
    newDataObject.setData("repositoryId", "");
    newDataObject.setData("repositories", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select Service Type"}
      selectOptions={TOOL_TYPES}
      valueField={"value"}
      textField={"label"}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

JenkinsAccountServiceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

JenkinsAccountServiceSelectInput.defaultProps = {
  fieldName: "service",
};

export default JenkinsAccountServiceSelectInput;
