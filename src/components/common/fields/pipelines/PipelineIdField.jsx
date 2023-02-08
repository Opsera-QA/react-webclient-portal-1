import React from "react";
import PropTypes from "prop-types";
import FieldLabel from "components/common/fields/FieldLabel";
import FieldContainer from "components/common/fields/FieldContainer";
import PipelineIdFieldBase from "components/common/fields/pipelines/PipelineIdFieldBase";

export default function PipelineIdField(
  {
    model,
    fieldName,
    className,
  }) {
  const field = model?.getFieldById(fieldName);

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <PipelineIdFieldBase
        pipelineId={model?.getData(fieldName)}
      />
    </FieldContainer>
  );
}

PipelineIdField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};
