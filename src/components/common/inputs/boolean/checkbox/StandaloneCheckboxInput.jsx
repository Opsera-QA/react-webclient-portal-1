import React from "react";
import PropTypes from "prop-types";
import {Form} from "react-bootstrap";
import {generateUUID, hasStringValue} from "components/common/helpers/string-helpers";
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
  const classNames = hasStringValue(className) ? `${className} d-flex` : "d-flex";

  return (
    <div
      className={`${mouseCursor} standalone-checkbox-input`}
      onClick={disabled !== true ? () => setDataFunction(!value) : undefined}
      style={{
        height: "22px"
      }}
    >
      <div className={classNames}>
        <input
          type={"checkbox"}
          checked={!!value}
          disabled={disabled === true}
          id={id}
          readOnly={true}
          className={"my-auto mr-2"}
        />
        <div className={"mb-auto"}>{label}</div>
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