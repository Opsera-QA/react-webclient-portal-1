import React from "react";
import PropTypes from "prop-types";

function VanityTextInputBase({ data, className, setDataFunction, disabled, type }) {
  return (
    <input
      type={type}
      disabled={disabled}
      value={data}
      onChange={(event) => setDataFunction(event.target.value)}
      className={className ? className : "text-input"}
    />
  );
}

VanityTextInputBase.propTypes = {
  type: PropTypes.string,
  data: PropTypes.string,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default VanityTextInputBase;