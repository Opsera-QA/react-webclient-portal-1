import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import usePipelineActions from "hooks/workflow/pipelines/usePipelineActions";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineRoleAccessInput(
  {
    fieldName,
    pipelineModel,
    setPipelineModel,
    loadData,
    visible,
    disabled,
    className,
  }) {
  const {
    userData,
    isSaasUser,
  } = useComponentStateReference();
  const pipelineActions = usePipelineActions();

  const saveData = async (newRoles) => {
    pipelineModel.setData(fieldName, newRoles);
    const response = await pipelineActions.updatePipelineActionRoles(
      pipelineModel.getMongoDbId(),
      newRoles,
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
      className={className}
      fieldName={fieldName}
      model={pipelineModel}
      disabled={canEdit !== true}
      saveData={saveData}
      visible={visible}
      lostAccessRerouteRoute={pipelineHelper.getManagementScreenLink()}
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
  className: PropTypes.string,
};

PipelineRoleAccessInput.defaultProps = {
  fieldName: "roles"
};