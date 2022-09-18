import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import DoneButtonBase from "components/common/buttons/done/DoneButtonBase";

export default function DoneOverlayButton({
  className,
  buttonText,
  disabled,
}) {
  const { toastContext } = useComponentStateReference();

  const closeOverlayFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <DoneButtonBase
      onClickFunction={closeOverlayFunction}
      className={className}
      buttonText={buttonText}
      disabled={disabled}
    />
  );
}

DoneOverlayButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
};
