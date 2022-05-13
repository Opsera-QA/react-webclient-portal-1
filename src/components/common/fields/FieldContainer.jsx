import React from "react";
import PropTypes from "prop-types";

function FieldContainer({ children, className }) {
  return (
    <div className={className ? className : "my-2 text-color"}>
      {children}
    </div>
  );
}

FieldContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default FieldContainer;