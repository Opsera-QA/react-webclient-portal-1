import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {
  platformPipelineTemplateCatalogActions
} from "components/workflow/catalog/platform/platformPipelineTemplateCatalog.actions";
import useComponentStateReference from "hooks/useComponentStateReference";
import PlatformPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/platform/platformPipelineTemplateRole.helper";

export default function PlatformPipelineTemplateRoleAccessInput(
  {
    fieldName,
    model,
    setModel,
    visible,
  }) {
  const {
    getAccessToken,
    cancelTokenSource,
    userData,
  } = useComponentStateReference();

  const saveData = async (newRoles) => {
    const response = await platformPipelineTemplateCatalogActions.updatePlatformPipelineTemplateAccessRoles(
      getAccessToken,
      cancelTokenSource,
      model?.getMongoDbId(),
      newRoles,
    );
    model.setData(fieldName, newRoles);
    setModel({...model});
    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Role Access Configurations Applied. All users can see or edit this {model?.getType()}.</span>
    );
  };

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={model}
      disabled={PlatformPipelineTemplateRoleHelper.canUpdateAccessRoles(userData, model?.getOriginalData()) !== true}
      visible={visible}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
    />
  );
}

PlatformPipelineTemplateRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  visible: PropTypes.bool,
};

PlatformPipelineTemplateRoleAccessInput.defaultProps = {
  fieldName: "roles"
};