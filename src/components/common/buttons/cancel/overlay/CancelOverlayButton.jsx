import React from "react";
import PropTypes from "prop-types";
import CancelButtonBase from "components/common/buttons/cancel/CancelButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function CancelOverlayButton({
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
    <CancelButtonBase
      cancelFunction={closeOverlayFunction}
      className={className}
      buttonText={buttonText}
      disabled={disabled}
    />
  );
}

CancelOverlayButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string,
};
