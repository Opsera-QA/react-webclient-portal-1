import React from "react";
import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";

export function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function NavigationDropdownSelectOption(
  {
    setDataFunction,
    selectedOption,
    text,
    value,
    id,
    className,
    disabled,
  }) {
  if (setDataFunction == null || text == null) {
    return null;
  }

  return (
    <NavDropdown.Item
      onClick={() => setDataFunction(value)}
      className={className}
      id={id}
      active={selectedOption === value}
      disabled={disabled}
    >
      {text}
    </NavDropdown.Item>
  );
}

NavigationDropdownSelectOption.propTypes = {
  setDataFunction: PropTypes.func,
  text: PropTypes.any,
  value: PropTypes.any,
  selectedOption: PropTypes.any,
  id: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

NavigationDropdownSelectOption.defaultProps = {
  id: generateUUID(),
};

export default NavigationDropdownSelectOption;
