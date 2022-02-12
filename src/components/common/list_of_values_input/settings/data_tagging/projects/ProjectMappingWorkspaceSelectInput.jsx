import React from "react";
import PropTypes from "prop-types";
import BitbucketWorkspaceInput from "components/common/list_of_values_input/tools/bitbucket/BitbucketWorkspaceInput";

function ProjectMappingWorkspaceSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId}) {
  const setDataFunction = async (fieldName, value) => {
    const newModel = dataObject;
    newModel.setData("tool_prop", value.key);
    newModel.setData("tool_prop_name", value.name);
    setDataObject({...newModel});
  };

  return (
    <BitbucketWorkspaceInput
      fieldName={fieldName}
      dataObject={dataObject}
      gitToolId={dataObject?.getData("tool_id")}
      setDataFunction={setDataFunction}
      setDataObject={setDataObject}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
    />
  );
}

ProjectMappingWorkspaceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string
};

ProjectMappingWorkspaceSelectInput.defaultProps = {
  fieldName: "tool_prop_name",
  valueField: "key",
  textField: "name"
};

export default ProjectMappingWorkspaceSelectInput;