import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TOOL_TYPES = [
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "coverity", label: "Coverity"},
];

function JenkinsAccountServiceSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  
  const setJenkinsAccountService = (fieldName, selectedOption) => {    
    let newDataObject = dataObject;
    newDataObject?.setData(fieldName, selectedOption?.value);
    newDataObject.setData("credentailsToolId", "");
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", "");
    newDataObject.setData("accountUserName", "");
    newDataObject.setData("toolId", "");
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
      setDataFunction={setJenkinsAccountService}
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
