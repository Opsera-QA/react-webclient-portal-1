import React from "react";
import PropTypes from "prop-types";
import SelectedPipelineList from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";

export default function SelectedPipelinesField(
  {
    model,
    fieldName,
  }) {
  return (
    <SelectedPipelineList
      model={model}
      fieldName={fieldName}
    />
  );
}

SelectedPipelinesField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
};
