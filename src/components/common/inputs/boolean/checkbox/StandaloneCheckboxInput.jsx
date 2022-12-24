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
    <div
      className={disabled !== true ? "pointer" : "not-allowed"}
      onClick={disabled !== true ? () => setDataFunction(!value) : undefined}
    >
      <div className={"d-flex"}>
        <Form.Check
          type={"checkbox"}
          className={className}
          id={id}
          checked={!!value}
          disabled={disabled === true}
          label={""}
          onChange={() => {
            setDataFunction(!value);
          }}
        />
        <div>{label}</div>
      </div>
    </div>
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