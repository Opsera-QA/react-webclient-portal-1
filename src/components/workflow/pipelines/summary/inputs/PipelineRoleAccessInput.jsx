import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import ToolRegistryRoleAccessHelpDocumentation
  from "components/common/help/documentation/tool_registry/ToolRegistryRoleAccessHelpDocumentation";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import pipelineActions from "components/workflow/pipeline-actions";

export default function PipelineRoleAccessInput(
  {
    fieldName, 
    pipelineModel,
    setPipelineModel,
    loadData,
    visible,
    disabled,
  }) {
  const {
    userData,
    cancelTokenSource,
    getAccessToken,
    isSaasUser,
  } = useComponentStateReference();

  // TODO: Make update tool roles route
  const saveData = async (newRoles) => {
    pipelineModel.setData(fieldName, newRoles);
    const response = await pipelineActions.updatePipelineV2(
      getAccessToken,
      cancelTokenSource,
      pipelineModel.getMongoDbId(),
      pipelineModel.getPersistData(),
    );
    setPipelineModel({...pipelineModel});
    if (loadData) {
      loadData();
    }
    return response;
  };

  if (pipelineModel == null || isSaasUser !== false) {
    return null;
  }

  const canEdit = PipelineRoleHelper.canEditAccessRoles(userData, pipelineModel?.getCurrentData()) && disabled !== true;

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={pipelineModel}
      disabled={canEdit !== true}
      saveData={saveData}
      visible={visible}
    />
  );
}

PipelineRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  pipelineModel: PropTypes.object,
  setPipelineModel: PropTypes.func,
  visible: PropTypes.bool,
  loadData: PropTypes.func,
  disabled: PropTypes.bool,
};

PipelineRoleAccessInput.defaultProps = {
  fieldName: "roles"
};