import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

// TODO: Add support for filtering list. Make another base class more suited for User/Project mapping?
function UserMappingToolSelectInput({visible, dataObject, setDataObject, disabled, fieldName}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("tool_prop", "");
    newDataObject.setData("tool_user_prop", "");
    newDataObject.setData("tool_user_id", "");
    newDataObject.setData("tool_id", selectedOption?._id);
    newDataObject.setData("tool_prop", "");
    newDataObject.setData("tool_user_prop", "");
    newDataObject.setData("tool_user_id", "");
    setDataObject({...newDataObject});
  };

  return (
    <RoleRestrictedToolByIdentifierInputBase
      toolIdentifier={dataObject?.getData("tool_identifier")}
      toolFriendlyName={"Tool"}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      model={dataObject}
      setModel={setDataObject}
      placeholderText={"Select a Tool"}
      visible={visible}
      disabled={disabled}
    />
  );
}

UserMappingToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  visible: PropTypes.bool
};

UserMappingToolSelectInput.defaultProps = {
  fieldName: "tool_id"
};

export default UserMappingToolSelectInput;