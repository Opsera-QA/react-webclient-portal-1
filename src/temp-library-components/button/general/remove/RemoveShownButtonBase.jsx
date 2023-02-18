import React from "react";
import PropTypes from "prop-types";
import {faMinusCircle} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function RemoveShownButtonBase(
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
    itemCount,
    buttonSize,
  }) {
  return (
    <VanityButtonBase
      className={className}
      icon={icon}
      disabled={itemCount === 0 || disabled}
      buttonState={buttonState}
      onClickFunction={onClickFunction}
      variant={"outline-danger"}
      successText={successText}
      errorText={errorText}
      busyText={busyText}
      normalText={normalText}
      buttonSize={buttonSize}
      badgeText={itemCount}
    />
  );
}

RemoveShownButtonBase.propTypes = {
  buttonState: PropTypes.string,
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  normalText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  busyText: PropTypes.string,
  itemCount: PropTypes.number,
  buttonSize: PropTypes.string,
};

RemoveShownButtonBase.defaultProps = {
  icon: faMinusCircle,
  normalText: "Remove Shown",
};