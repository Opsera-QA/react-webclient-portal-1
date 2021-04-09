import React from "react";
import PropTypes from "prop-types";

function InputContainer({ children, className }) {
  return (
    <div className={className ? className : "my-2"}>
      {children}
    </div>
  );
}

InputContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default InputContainer;