import React from "react";
import PropTypes from "prop-types";

function FieldSubHeader({ subheaderText }) {
  return (
    <h4 className="mb-2">{subheaderText}</h4>
  );
}


FieldSubHeader.propTypes = {
  subheaderText: PropTypes.string,
};

export default FieldSubHeader;