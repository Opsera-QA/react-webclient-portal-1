import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";

export default function PipelineWorkflowItemField(
  {
    icon,
    className,
    model,
    fieldName,
  }) {
  const field = model?.getFieldById(fieldName);

  if (field == null) {
    return null;
  }

  return (
    <PipelineWorkflowItemFieldBase
      icon={icon}
      className={className}
      label={field?.label}
      value={model?.getData(fieldName)}
    />
  );
}

PipelineWorkflowItemField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
};