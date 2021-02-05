import React from "react";
import PropTypes from "prop-types";

function FieldLabel({ field, fieldName }) {
  if (field == null) {
    return <label className="mb-0 mr-2 text-muted"><span>No Metadata For This Field [${fieldName}]:</span></label>;
  }

  if (field.label == null) {
    return <></>;
  }

  return (<label className="mb-0 mr-2 text-muted"><span>{field.label}:</span></label>);
}

FieldLabel.propTypes = {
  field: PropTypes.object,
  fieldName: PropTypes.string
};

export default FieldLabel;