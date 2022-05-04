import React from "react";
import PropTypes from "prop-types";

function H4FieldSubHeader({ subheaderText }) {
  return (
    <h4 className={"mb-2 text-color"}>
      {subheaderText}
    </h4>
  );
}


H4FieldSubHeader.propTypes = {
  subheaderText: PropTypes.string,
};

export default H4FieldSubHeader;