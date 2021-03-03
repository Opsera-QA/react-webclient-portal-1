import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TOOL_TYPES = [
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  { value: "bitbucket", label: "Bitbucket" },
];

function JenkinsAccountServiceSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select an SCM Service Type"}
      selectOptions={TOOL_TYPES}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
  );
}

JenkinsAccountServiceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JenkinsAccountServiceSelectInput.defaultProps = {
  fieldName: "service",
};

export default JenkinsAccountServiceSelectInput;
