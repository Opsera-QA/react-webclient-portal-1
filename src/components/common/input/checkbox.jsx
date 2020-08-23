import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  isSelected: PropTypes.bool,
  onCheckboxChange: PropTypes.func
};
export default Checkbox;