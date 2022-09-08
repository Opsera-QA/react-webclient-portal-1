import React from "react";
import PropTypes from "prop-types";

export default function CenteredContentWrapper(
  {
    minHeight,
    children,
  }) {
  return (
    <div
      style={{
        minHeight: minHeight,
      }}
      className={"d-flex align-items-center justify-content-center"}
    >
      {children}
    </div>
  );
}

CenteredContentWrapper.propTypes = {
  children: PropTypes.any,
  minHeight: PropTypes.string,
};