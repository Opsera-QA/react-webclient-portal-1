import React from "react";
import PropTypes from "prop-types";

function CenteredContentWrapper(
  {
    children,
  }) {
  return (
    <div className={"d-flex h-100"}>
      <div className={"m-auto"}>
        {children}
      </div>
    </div>
  );
}

CenteredContentWrapper.propTypes = {
  children: PropTypes.any,
};

export default CenteredContentWrapper;