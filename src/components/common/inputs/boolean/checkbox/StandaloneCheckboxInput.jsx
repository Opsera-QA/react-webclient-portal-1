import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { generateUUID } from "components/common/helpers/string-helpers";
import {mouseHelper} from "temp-library-components/helpers/mouse/mouse.helper";

export default function StandaloneCheckboxInput(
  {
    id,
    value,
    label,
    setDataFunction,
    disabled,
    className,
  }) {
  const mouseCursor = mouseHelper.getMouseCursor(setDataFunction, disabled);

  return (
    <div
      className={`${mouseCursor}`}
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
          readOnly={true}
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