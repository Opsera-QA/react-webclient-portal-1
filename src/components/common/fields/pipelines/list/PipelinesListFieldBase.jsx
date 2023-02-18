import React from "react";
import PropTypes from "prop-types";
import SelectedPipelineList from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";

export default function PipelinesListFieldBase(
  {
    model,
    fieldName,
    title,
  }) {
  return (
    <SelectedPipelineList
      model={model}
      fieldName={fieldName}
      currentData={model?.getArrayData(fieldName)}
      disabled={true}
      title={title}
    />
  );
}

PipelinesListFieldBase.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  title: PropTypes.string,
};
