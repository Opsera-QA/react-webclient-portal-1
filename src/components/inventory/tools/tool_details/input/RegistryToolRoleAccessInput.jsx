import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolRegistryRoleAccessHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryRoleAccessHelpDocumentation";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function RegistryToolRoleAccessInput(
  {
    fieldName, 
    toolModel, 
    setToolModel, 
    visible,
  }) {
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
    isSaasUser,
  } = useComponentStateReference();

  const saveData = async (newRoles) => {
    toolModel.setData(fieldName, newRoles);
    const response = await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolModel);
    setToolModel({...toolModel});
    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Access Rules are currently applied. All users can see or edit this {toolModel?.getType()}.</span>
    );
  };

  if (toolModel == null || isSaasUser !== false) {
    return null;
  }

  const canEdit = RegistryToolRoleHelper.canEditAccessRoles(userData, toolModel?.getPersistData());

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={toolModel}
      disabled={canEdit !== true}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
      helpComponent={<ToolRegistryRoleAccessHelpDocumentation/>}
      visible={visible}
    />
  );
}

RegistryToolRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

RegistryToolRoleAccessInput.defaultProps = {
  fieldName: "roles"
};