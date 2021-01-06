import React from "react";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";

function PipelineThresholdField({ thresholdDataObject }) {
  // TODO: Style
  return (
    <div>
      <BooleanField dataObject={thresholdDataObject} fieldName={"completeFirst"} />
      <BooleanField dataObject={thresholdDataObject} fieldName={"ensureSuccess"} />
    </div>
  );
}

PipelineThresholdField.propTypes = {
  thresholdDataObject: PropTypes.object,
};

export default PipelineThresholdField;