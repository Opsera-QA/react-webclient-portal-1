import React from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import InfoOverlayBase from "components/common/overlays/info/InfoOverlayBase";

export default function AccessDeniedOverlayBase(
  {
    children,
  }) {
  if (children == null) {
    return null;
  }

  return (
    <InfoOverlayBase
      titleText={"Permission Denied"}
      titleIcon={faExclamationCircle}
      height={"100px"}
    >
      {children}
    </InfoOverlayBase>
  );
}

AccessDeniedOverlayBase.propTypes = {
  children: PropTypes.any,
};
