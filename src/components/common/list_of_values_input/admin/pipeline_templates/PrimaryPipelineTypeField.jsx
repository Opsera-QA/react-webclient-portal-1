import React from "react";
import PropTypes from "prop-types";
import ConstantFieldBase from "components/common/fields/constant/ConstantFieldBase";
import {pipelineTypeConstants} from "components/common/list_of_values_input/pipelines/types/pipeline.types";

export default function PrimaryPipelineTypeField(
  {
    fieldName,
    model,
  }) {
  return (
    <ConstantFieldBase
      fieldName={fieldName}
      model={model}
      getLabelFunction={pipelineTypeConstants.getLabelForPipelineTypeArray}
    />
  );
}

PrimaryPipelineTypeField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};