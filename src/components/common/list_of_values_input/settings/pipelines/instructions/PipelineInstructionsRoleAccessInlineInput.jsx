import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import ToolRegistryRoleAccessHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryRoleAccessHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineInstructionsRoleHelper
  from "@opsera/know-your-role/roles/settings/pipelines/instructions/pipelineInstructionsRole.helper";

export default function PipelineInstructionsRoleAccessInlineInput(
  {
    fieldName, 
    pipelineInstructionsModel, 
    setPipelineInstructionsModel, 
    visible,
  }) {
  const {
    userData,
    isSaasUser,
  } = useComponentStateReference();

  const saveData = async (newRoles) => {
    pipelineInstructionsModel.setData(fieldName, newRoles);
    const response = await pipelineInstructionsModel.saveModel();
    setPipelineInstructionsModel({...pipelineInstructionsModel});
    return response;
  };

  if (pipelineInstructionsModel == null || isSaasUser !== false) {
    return null;
  }

  const canEdit = PipelineInstructionsRoleHelper.canEditAccessRoles(userData, pipelineInstructionsModel?.getCurrentData());

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={pipelineInstructionsModel}
      disabled={canEdit !== true}
      saveData={saveData}
      helpComponent={<ToolRegistryRoleAccessHelpDocumentation/>}
      visible={visible}
    />
  );
}

PipelineInstructionsRoleAccessInlineInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineInstructionsModel: PropTypes.object,
  setPipelineInstructionsModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};