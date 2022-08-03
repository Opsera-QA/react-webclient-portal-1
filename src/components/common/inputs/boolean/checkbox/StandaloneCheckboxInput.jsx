import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { generateUUID } from "components/common/helpers/string-helpers";

function StandaloneCheckboxInput({id, value, label, setDataFunction, disabled}) {
  return (
    <Form.Check
      type={"checkbox"}
      id={id}
      checked={!!value}
      disabled={disabled}
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
};

StandaloneCheckboxInput.defaultProps = {
  id: generateUUID(),
};

export default StandaloneCheckboxInput;