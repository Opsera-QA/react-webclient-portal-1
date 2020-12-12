import React from "react";
import PropTypes from "prop-types";

function Label({ field }) {
  return (<label className="mr-2 text-muted"><span>{field.label}:</span></label>);
}

Label.propTypes = {
  field: PropTypes.object,
};

export default Label;