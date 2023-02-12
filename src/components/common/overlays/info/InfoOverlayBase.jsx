import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ConfirmationOverlay from "components/common/overlays/center/ConfirmationOverlay";

export default function InfoOverlayBase(
  {
    titleText,
    titleIcon,
    height,
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
      titleText={titleText}
      titleIcon={titleIcon}
      height={height}
    >
      <div className={"p-3 d-flex h-100"}>
        <div className={"my-auto"}>
          {children}
        </div>
      </div>
    </ConfirmationOverlay>
  );
}

InfoOverlayBase.propTypes = {
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  height: PropTypes.string,
  children: PropTypes.any,
};

InfoOverlayBase.defaultProps = {
  height: "100px",
};
