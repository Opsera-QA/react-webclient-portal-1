import React from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import { faSearchPlus } from "@fortawesome/pro-light-svg-icons";

export default function ActionBarViewJsonButtonBase(
  {
    showJsonFunction,
    disabled,
    className,
  }) {
  if (showJsonFunction == null && disabled !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showJsonFunction}
      icon={faSearchPlus}
      popoverText={`Show object JSON`}
      className={className}
    />
  );
}

ActionBarViewJsonButtonBase.propTypes = {
  showJsonFunction: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
