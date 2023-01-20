import React, {useContext} from "react";
import PropTypes from "prop-types";
import RoleAccessInlineInputBase from "components/common/inline_inputs/roles/RoleAccessInlineInputBase";
import {AuthContext} from "contexts/AuthContext";
import { taskTemplateActions } from "components/admin/task_templates/taskTemplate.actions";

export default function TaskTemplateInlineRoleAccessInput(
  {
    fieldName, 
    templateModel,
    setTemplateModel, 
    disabled, 
    visible,
  }) {
  const { getAccessToken } = useContext(AuthContext);

  const saveData = async (newRoles) => {
    templateModel.setData(fieldName, newRoles);
    const response = await taskTemplateActions.updateTemplate(templateModel, getAccessToken);
    setTemplateModel({...templateModel});
    return response;
  };

  const getNoDataMessage = () => {
    return (
      <span>No Role Access Configurations Applied. All users can see or edit this {templateModel?.getType()}.</span>
    );
  };

  return (
    <RoleAccessInlineInputBase
      fieldName={fieldName}
      model={templateModel}
      disabled={disabled}
      visible={visible}
      saveData={saveData}
      noDataMessage={getNoDataMessage()}
    />
  );
}

TaskTemplateInlineRoleAccessInput.propTypes = {
  fieldName: PropTypes.string,
  templateModel: PropTypes.object,
  setTemplateModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

TaskTemplateInlineRoleAccessInput.defaultProps = {
  fieldName: "roles",
};