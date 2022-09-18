import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function DoneButtonBase({
  onClickFunction,
  size,
  className,
  buttonText,
  disabled,
}) {
  if (onClickFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        size={size}
        variant={"secondary"}
        disabled={disabled}
        onClick={onClickFunction}
        className={"w-100"}
      >
        <span>
          <IconBase
            icon={faCheck}
            className={"mr-2"}
          />
          {buttonText}
        </span>
      </Button>
    </div>
  );
}

DoneButtonBase.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  buttonText: PropTypes.string,
};

DoneButtonBase.defaultProps = {
  size: "md",
  buttonText: "Done",
};
