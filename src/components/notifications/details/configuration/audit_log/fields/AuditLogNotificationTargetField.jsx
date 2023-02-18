import React from "react";
import PropTypes from "prop-types";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import PipelineListFieldBase from "components/common/fields/pipelines/list/PipelineListFieldBase";
import TaskListFieldBase from "components/common/fields/tasks/list/TaskListFieldBase";

export default function AuditLogNotificationTargetField(
  {
    fieldName,
    model,
  }) {
  const objectType = model?.getData("method");

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TASK) {
    return (
      <TaskListFieldBase
        model={model}
        fieldName={fieldName}
        customTitle={"Notify on These Tasks"}
      />
    );
  }
  //
  // if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.TOOL_REGISTRY) {
  //   return (
  //     <ToolMultiSelectInput
  //       model={model}
  //       setModel={setModel}
  //       fieldName={fieldName}
  //       disabled={disabled}
  //     />
  //   );
  // }

  if (objectType === auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE) {
    return (
      <PipelineListFieldBase
        model={model}
        fieldName={fieldName}
        customTitle={"Notify on These Pipelines"}
      />
    );
  }

  return null;
}

AuditLogNotificationTargetField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

AuditLogNotificationTargetField.defaultProps = {
  fieldName: "target"
};
