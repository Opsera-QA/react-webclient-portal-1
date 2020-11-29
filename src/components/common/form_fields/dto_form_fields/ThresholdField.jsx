import React from "react";
import PropTypes from "prop-types";
import BooleanField from "./BooleanField";

function ThresholdField({ thresholdDataObject }) {
  // TODO: Style
  return (
    <div>
      <BooleanField dataObject={thresholdDataObject} fieldName={"completeFirst"} />
      <BooleanField dataObject={thresholdDataObject} fieldName={"ensureSuccess"} />
    </div>
  );
}

ThresholdField.propTypes = {
  thresholdDataObject: PropTypes.object,
};

export default ThresholdField;