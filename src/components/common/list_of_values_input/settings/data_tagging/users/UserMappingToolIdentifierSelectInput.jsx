import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: When all are supported, move to a common spot for both this and ProjectMappingToolIdtentiferSelectInput
const TOOL_TYPES = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  // { value: "bitbucket", label: "Bitbucket" },
  { value: "jira", label: "Jira" },
  // { value: "sonar", label: "Sonar" }, DISABLING SONAR FOR NOW
];


function UserMappingToolIdentifierSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  const setDataAndValidate = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("tool_identifier", value.value);
    newDataObject.setData("tool_id", "");
    newDataObject.setData("tool_prop", "");
    newDataObject.setData("tool_user_prop", "");
    newDataObject.setData("tool_user_id", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataAndValidate}
      selectOptions={TOOL_TYPES}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
  );
}

UserMappingToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

UserMappingToolIdentifierSelectInput.defaultProps = {
  fieldName: "tool_identifier"
};

export default UserMappingToolIdentifierSelectInput;