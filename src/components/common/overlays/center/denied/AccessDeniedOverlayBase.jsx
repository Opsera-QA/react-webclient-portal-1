import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";

export default function AccessDeniedOverlayBase(
  {
    children,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  if (children == null) {
    return null;
  }

    return (
      <ConfirmationOverlay
        closePanel={closePanel}
        titleText={"Permission Denied"}
        titleIcon={faExclamationCircle}
        height={"100px"}
      >
        <div className={"p-3 d-flex h-100"}>
          <div className={"my-auto"}>
            {children}
          </div>
        </div>
      </ConfirmationOverlay>
    );
}

AccessDeniedOverlayBase.propTypes = {
  children: PropTypes.any,
};
