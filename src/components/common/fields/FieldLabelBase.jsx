import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

function FieldLabelBase({ label, showLabel }) {
  if (hasStringValue(label) === false || showLabel === false) {
    return null;
  }

  return (
    <label className="mb-0 mr-2 text-muted">
      <span>{label}:</span>
    </label>
  );
}

FieldLabelBase.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool
};

export default FieldLabelBase;