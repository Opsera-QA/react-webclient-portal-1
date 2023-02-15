import React from "react";
import PropTypes from "prop-types";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import PipelineMultiSelectInput
  from "components/common/list_of_values_input/workflow/pipelines/PipelineMultiSelectInput";
import ToolMultiSelectInput from "components/common/list_of_values_input/inventory/ToolMultiSelectInput";
import TaskMultiSelectInput from "components/common/list_of_values_input/tasks/TaskMultiSelectInput";

export default function AuditLogNotificationTargetMultiSelectInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const objectType = model?.getData("method");

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TASK) {
    return (
      <TaskMultiSelectInput
        model={model}
        setModel={setModel}
        fieldName={fieldName}
        disabled={disabled}
      />
    );
  }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TOOL_REGISTRY) {
    return (
      <ToolMultiSelectInput
        model={model}
        setModel={setModel}
        fieldName={fieldName}
        disabled={disabled}
      />
    );
  }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE) {
    return (
      <PipelineMultiSelectInput
        model={model}
        setModel={setModel}
        fieldName={fieldName}
        disabled={disabled}
      />
    );
  }

  return null;
}

AuditLogNotificationTargetMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

AuditLogNotificationTargetMultiSelectInput.defaultProps = {
  fieldName: "target"
};
