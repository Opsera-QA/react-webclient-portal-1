import React from "react";
import PropTypes from "prop-types";
import OrchestrationStateField from "temp-library-components/fields/orchestration/state/OrchestrationStateField";

export default function PipelineStateField(
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
      type={"Pipeline"}
    />
  );
}

PipelineStateField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  showLabel: PropTypes.bool,
};

PipelineStateField.defaultProps = {
  fieldName: "state",
};