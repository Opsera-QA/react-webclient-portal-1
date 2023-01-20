import React from "react";
import PropTypes from "prop-types";
import OrchestrationStateField from "temp-library-components/fields/orchestration/state/OrchestrationStateField";

export default function TaskStateField(
  {
    fieldName,
    model,
    showLabel,
  }) {
  return (
    <OrchestrationStateField
      model={model}
      fieldName={fieldName}
      showLabel={showLabel}
      type={"Task"}
    />
  );
}

TaskStateField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  showLabel: PropTypes.bool,
};

TaskStateField.defaultProps = {
  fieldName: "status",
};