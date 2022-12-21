import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { generateUUID } from "components/common/helpers/string-helpers";

export default function StandaloneCheckboxInput(
  {
    id,
    value,
    label,
    setDataFunction,
    disabled,
    className,
  }) {
  return (
    <Form.Check
      type={"checkbox"}
      className={className}
      id={id}
      checked={!!value}
      disabled={disabled === true}
      label={label}
      onChange={() => {
        setDataFunction(!value);
      }}
    />
  );
}

StandaloneCheckboxInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
};

StandaloneCheckboxInput.defaultProps = {
  id: generateUUID(),
};