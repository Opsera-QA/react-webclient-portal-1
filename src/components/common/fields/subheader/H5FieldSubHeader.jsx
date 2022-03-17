import React from "react";
import PropTypes from "prop-types";

function H5FieldSubHeader({ subheaderText }) {
  return (
    <h5 className={"mb-2"}>
      {subheaderText}
    </h5>
  );
}

H5FieldSubHeader.propTypes = {
  subheaderText: PropTypes.string,
};

export default H5FieldSubHeader;