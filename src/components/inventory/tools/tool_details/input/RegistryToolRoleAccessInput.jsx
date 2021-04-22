import React, {useContext} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import ToolRegistryRoleAccessHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryRoleAccessHelpDocumentation";

function RegistryToolRoleAccessInput({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);

  const saveData = async (newRoles) => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, newRoles);
    const response = await toolsActions.updateTool(newDataObject, getAccessToken);
    setDataObject({...newDataObject});
    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Access Rules are currently applied. All users can see or edit this {dataObject?.getType()}.</span>
    );
  };

  if (dataObject == null || isSassUser()) {
    return null;
  }

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      disabled={disabled}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
      helpComponent={<ToolRegistryRoleAccessHelpDocumentation/>}
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