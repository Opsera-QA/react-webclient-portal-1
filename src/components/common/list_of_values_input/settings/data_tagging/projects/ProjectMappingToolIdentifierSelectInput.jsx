import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TOOL_TYPES = [
  { value: "gitlab", label: "Gitlab" },
  { value: "github", label: "Github" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "jira", label: "Jira" },
  { value: "jenkins", label: "Jenkins" },
  { value: "sonar", label: "Sonar" },
];

function ProjectMappingToolIdentifierSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  const setDataAndValidate = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("tool_identifier", value.value);
    newDataObject.setData("tool_id", "");
    newDataObject.setData("tool_prop", "");
    newDataObject.setData("key", "");
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

ProjectMappingToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ProjectMappingToolIdentifierSelectInput.defaultProps = {
  fieldName: "tool_identifier"
};

export default ProjectMappingToolIdentifierSelectInput;