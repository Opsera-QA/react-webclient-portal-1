import React from "react";
import PropTypes from "prop-types";
import PipelineWorkflowItemFieldBase
  from "components/workflow/pipelines/pipeline_details/workflow/fields/PipelineWorkflowItemFieldBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function PipelineWorkflowStepTextField(
  {
    icon,
    className,
    model,
    fieldName,
  }) {
  const field = model?.getFieldById(fieldName);
  const value = model?.getData(fieldName);

  if (field == null || hasStringValue(value) !== true) {
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

PipelineWorkflowStepTextField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
};