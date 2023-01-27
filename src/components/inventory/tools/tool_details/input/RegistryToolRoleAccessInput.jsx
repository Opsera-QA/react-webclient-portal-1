import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import toolsActions from "components/inventory/tools/tools-actions";
import ToolRegistryRoleAccessHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryRoleAccessHelpDocumentation";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import {toolHelper} from "components/inventory/tools/tool.helper";

export default function RegistryToolRoleAccessInput(
  {
    fieldName, 
    toolModel, 
    setToolModel,
    visible,
    loadToolFunction,
  }) {
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
    isSaasUser,
  } = useComponentStateReference();

  // TODO: Make update tool roles route
  const saveData = async (newRoles) => {
    toolModel.setData(fieldName, newRoles, false);
    const response = await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolModel);
    setToolModel({...toolModel});
    await loadToolFunction();
    return response;
  };

  if (toolModel == null || isSaasUser !== false) {
    return null;
  }

  const canEdit = RegistryToolRoleHelper.canEditAccessRoles(userData, toolModel?.getCurrentData());

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={toolModel}
      disabled={canEdit !== true}
      saveData={saveData}
      helpComponent={<ToolRegistryRoleAccessHelpDocumentation/>}
      visible={visible}
      lostAccessRerouteRoute={toolHelper.getManagementScreenLink()}
    />
  );
}

RegistryToolRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  toolModel: PropTypes.object,
  setToolModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  loadToolFunction: PropTypes.func,
};

RegistryToolRoleAccessInput.defaultProps = {
  fieldName: "roles"
};