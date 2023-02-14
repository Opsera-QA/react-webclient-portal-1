import React from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  customerPipelineTemplateCatalogActions
} from "components/workflow/catalog/private/customerPipelineTemplateCatalog.actions";
import CustomerPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/customer/customerPipelineTemplateRole.helper";

export default function CustomerPipelineTemplateRoleAccessInput(
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
    const response = await customerPipelineTemplateCatalogActions.updateCustomerPipelineTemplateAccessRoles(
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
      disabled={CustomerPipelineTemplateRoleHelper.canUpdateAccessRoles(userData, model?.getOriginalData()) !== true}
      visible={visible}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
      lostAccessRerouteRoute={"/workflow/catalog/library"}
    />
  );
}

CustomerPipelineTemplateRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  visible: PropTypes.bool,
};

CustomerPipelineTemplateRoleAccessInput.defaultProps = {
  fieldName: "roles"
};