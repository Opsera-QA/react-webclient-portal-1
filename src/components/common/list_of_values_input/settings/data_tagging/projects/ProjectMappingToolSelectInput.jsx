import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function ProjectMappingToolSelectInput({visible, model, setModel, disabled, fieldName}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption?._id);
    newModel.setDefaultValue("tool_prop");
    newModel.setDefaultValue("key");
    newModel.setDefaultValue("keyPath");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={model?.getData("tool_identifier")}
      toolFriendlyName={"Tool"}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      placeholderText={"Select a Tool"}
      visible={visible}
      disabled={disabled}
    />
  );
}

ProjectMappingToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  visible: PropTypes.bool
};

ProjectMappingToolSelectInput.defaultProps = {
  fieldName: "tool_id"
};

export default ProjectMappingToolSelectInput;