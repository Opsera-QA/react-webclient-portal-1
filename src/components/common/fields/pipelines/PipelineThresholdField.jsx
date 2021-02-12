import React from "react";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";

function PipelineThresholdField({ thresholdDataObject, className }) {
  // TODO: Style
  return (
    <div className={className}>
      <BooleanField dataObject={thresholdDataObject} fieldName={"completeFirst"} />
      <BooleanField dataObject={thresholdDataObject} fieldName={"ensureSuccess"} />
    </div>
  );
}

PipelineThresholdField.propTypes = {
  thresholdDataObject: PropTypes.object,
  className: PropTypes.string
};

export default PipelineThresholdField;