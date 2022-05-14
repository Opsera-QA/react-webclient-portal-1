import React from "react";
import PropTypes from "prop-types";
import PipelineTypeIconBase from "components/common/fields/pipelines/types/PipelineTypeIconBase";

function PipelineTypeIcon(
  {
    fieldName,
    model,
    className,
  }) {
  const getType = () => {
    const types = model?.getArrayData(fieldName);

    if (Array.isArray(types) && types.length > 0) {
      return types[0];
    }
  };

  if (model == null) {
    return null;
  }

  return (
    <PipelineTypeIconBase
      type={getType()}
      className={className}
    />
  );
}

PipelineTypeIcon.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
};

PipelineTypeIcon.defaultProps = {
  fieldName: "type",
};

export default PipelineTypeIcon;