import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";

export default function CancelButtonBase({
  cancelFunction,
  size,
  className,
  buttonText,
  disabled,
}) {
  if (cancelFunction == null && disabled !== true) {
    return null;
  }

  return (
    <div className={className}>
      <Button
        size={size}
        variant={"secondary"}
        disabled={disabled}
        onClick={() => cancelFunction()}
        className={"w-100"}
      >
        <span>
          <IconBase
            icon={faTimes}
            className={"mr-2"}
          />
          {buttonText}
        </span>
      </Button>
    </div>
  );
}

CancelButtonBase.propTypes = {
  cancelFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  buttonText: PropTypes.string,
};

CancelButtonBase.defaultProps = {
  size: "md",
  buttonText: "Cancel",
};
