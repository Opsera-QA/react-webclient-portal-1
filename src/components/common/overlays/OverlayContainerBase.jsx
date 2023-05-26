import React from "react";
import PropTypes from "prop-types";

export default function OverlayContainerBase(
  {
    children,
  }) {

  return (
    <div className={`overlay-panel center-overlay-shadow-background d-flex`}>
      {children}
    </div>
  );
}

OverlayContainerBase.propTypes = {
  children: PropTypes.any,
};
