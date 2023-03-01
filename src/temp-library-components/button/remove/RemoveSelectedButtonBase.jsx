import React from "react";
import PropTypes from "prop-types";
import {faArrowLeft} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";

export default function RemoveSelectedButtonBase(
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
    buttonClassName,
  }) {
  return (
    <VanityButtonBase
      className={className}
      icon={icon}
      disabled={itemCount === 0 || disabled}
      buttonState={buttonState}
      onClickFunction={onClickFunction}
      variant={"outline-primary"}
      successText={successText}
      errorText={errorText}
      busyText={busyText}
      normalText={normalText}
      buttonSize={buttonSize}
      badgeText={itemCount}
      buttonClassName={buttonClassName}
    />
  );
}

RemoveSelectedButtonBase.propTypes = {
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
  buttonClassName: PropTypes.string,
};

RemoveSelectedButtonBase.defaultProps = {
  icon: faArrowLeft,
  normalText: "Remove Selected",
};