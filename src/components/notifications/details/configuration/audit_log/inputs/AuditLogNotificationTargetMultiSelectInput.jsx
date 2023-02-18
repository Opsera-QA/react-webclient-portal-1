import React from "react";
import PropTypes from "prop-types";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import ToolMultiSelectInput from "components/common/list_of_values_input/inventory/ToolMultiSelectInput";
import PipelineSelectionPanel from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionPanel";
import TaskSelectionPanel from "components/common/list_of_values_input/tasks/selection/TaskSelectionPanel";

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
      <TaskSelectionPanel
        model={model}
        setModel={setModel}
        fieldName={fieldName}
        disabled={disabled}
        selectedListTitle={"Notify on These Tasks"}
        selectionListTitle={"Tasks"}
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
        selectedListTitle={"Notify on These Tools"}
        selectionListTitle={"Tools"}
      />
    );
  }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE) {
    return (
      <PipelineSelectionPanel
        model={model}
        setModel={setModel}
        fieldName={fieldName}
        disabled={disabled}
        selectedListTitle={"Notify on These Pipelines"}
        selectionListTitle={"Pipelines"}
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
