import React from "react";
import PropTypes from "prop-types";

function FieldLabel({ field, fieldName, showLabel }) {
  if (field == null) {
    console.error(`No Metadata For This Field [${fieldName}]`);
    return <label className="mb-0 mr-2 text-muted"><span>{fieldName}:</span></label>;
  }

  if (field.label == null || showLabel === false) {
    return null;
  }

  return (<label className="mb-0 mr-2 text-muted"><span>{field.label}:</span></label>);
}

FieldLabel.propTypes = {
  field: PropTypes.object,
  fieldName: PropTypes.string,
  showLabel: PropTypes.bool
};

export default FieldLabel;