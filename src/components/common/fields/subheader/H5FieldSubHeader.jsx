import React from "react";
import PropTypes from "prop-types";

function H5FieldSubHeader(
  {
    subheaderText,
    className,
  }) {
  return (
    <h5 className={className}>
      {subheaderText}
    </h5>
  );
}

H5FieldSubHeader.propTypes = {
  subheaderText: PropTypes.string,
  className: PropTypes.string,
};

H5FieldSubHeader.defaultProps = {
  className: "mb-2 text-color",
};

export default H5FieldSubHeader;