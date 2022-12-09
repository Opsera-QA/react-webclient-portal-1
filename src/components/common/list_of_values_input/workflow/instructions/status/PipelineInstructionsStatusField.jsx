import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import pipelineInstructionsTypeConstants
  from "@opsera/definitions/constants/pipelines/instructions/pipelineInstructionsType.constants";

export default function PipelineInstructionsStatusField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  return (
    <ConstantFieldBase
      getLabelFunction={pipelineInstructionsTypeConstants.getPipelineInstructionTypeLabel}
      model={model}
      fieldName={fieldName}
      className={className}
      showLabel={showLabel}
    />
  );
}

PipelineInstructionsStatusField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

PipelineInstructionsStatusField.defaultProps = {
  fieldName: "type",
};