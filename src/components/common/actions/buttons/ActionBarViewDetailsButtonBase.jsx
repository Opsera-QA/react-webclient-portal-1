import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";

export default function ActionBarViewDetailsButtonBase(
  {
    showDetailsFunction,
    tooltipText,
    className,
    disabled,
  }) {

  if (showDetailsFunction == null && disabled !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showDetailsFunction}
      className={className}
      icon={faFileAlt}
      popoverText={tooltipText}
    />
  );
}

ActionBarViewDetailsButtonBase.propTypes = {
  showDetailsFunction: PropTypes.func,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};