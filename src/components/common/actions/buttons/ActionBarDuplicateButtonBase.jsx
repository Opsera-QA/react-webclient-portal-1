import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faCopy} from "@fortawesome/pro-light-svg-icons";

export default function ActionBarDuplicateButtonBase(
  {
    duplicateFunction,
    popoverText,
    className,
    isDuplicating,
    disabled,
  }) {
  if (duplicateFunction == null && disabled !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={duplicateFunction}
      icon={faCopy}
      isBusy={isDuplicating}
      popoverText={popoverText}
      className={className}
    />
  );
}

ActionBarDuplicateButtonBase.propTypes = {
  duplicateFunction: PropTypes.func,
  className: PropTypes.string,
  isDuplicating: PropTypes.bool,
  popoverText: PropTypes.string,
  disabled: PropTypes.bool,
};