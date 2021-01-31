import React, {useContext} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";

function RegistryToolRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken } = useContext(AuthContext);

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    const response = await toolsActions.updateTool(newDataObject, getAccessToken);
    setDataObject({...newDataObject});
    return response;
  };

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      disabled={disabled}
      saveData={saveData}
      visible={visible}
    />
  );
}

RegistryToolRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

RegistryToolRoleAccessInput.defaultProps = {
  fieldName: "roles"
};

export default RegistryToolRoleAccessInput;