import React from "react";
import PropTypes from "prop-types";
import BooleanField from "components/common/fields/boolean/BooleanField";

function LegacyPipelineThresholdField({ model, className }) {
  return (
    <div className={className}>
      <BooleanField dataObject={model} fieldName={"completeFirst"} />
      <BooleanField dataObject={model} fieldName={"ensureSuccess"} />
    </div>
  );
}

LegacyPipelineThresholdField.propTypes = {
  model: PropTypes.object,
  className: PropTypes.string
};

export default LegacyPipelineThresholdField;