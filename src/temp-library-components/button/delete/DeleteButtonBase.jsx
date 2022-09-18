import React from "react";
import PropTypes from "prop-types";
import { faTrash } from "@fortawesome/pro-light-svg-icons";
import { cannotBeUndone } from "components/common/tooltip/popover-text";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function DeleteButtonBase(
  {
    onClickFunction,
    buttonState,
    disabled,
    icon,
    className,
    normalText,
    successText,
    errorText,
    busyText,
  }) {
  return (
    <VanityButtonBase
      className={className}
      icon={icon}
      disabled={disabled}
      buttonState={buttonState}
      onClickFunction={onClickFunction}
      tooltip={cannotBeUndone}
      variant={"danger"}
      successText={successText}
      errorText={errorText}
      busyText={busyText}
      normalText={normalText}
    />
  );
}

DeleteButtonBase.propTypes = {
  buttonState: PropTypes.string,
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  normalText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  busyText: PropTypes.string,
};

DeleteButtonBase.defaultProps = {
  icon: faTrash,
};