import React from "react";
import PropTypes from "prop-types";
import SelectedPipelineList from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";

export default function PipelinesListFieldBase(
  {
    model,
    fieldName,
    customTitle,
  }) {
  return (
    <SelectedPipelineList
      model={model}
      fieldName={fieldName}
      currentData={model?.getArrayData(fieldName)}
      disabled={true}
      customTitle={customTitle}
    />
  );
}

PipelinesListFieldBase.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
};
