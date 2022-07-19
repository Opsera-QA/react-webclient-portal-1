import React from "react";
import PropTypes from "prop-types";

function MetricDataBlockBaseContainer(
  {
    heightSize,
    backgroundColor,
    fontColor,
    fontFamily,
    children,
    className,
  }) {
  return (
    <div
      className={className}
      style={{
        borderRadius: "1em",
        height: "100px",
        backgroundColor: backgroundColor,
        color: fontColor,
        fontFamily: fontFamily,
      }}
    >
      {children}
    </div>
  );
}

MetricDataBlockBaseContainer.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.string,
  widthSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

export default MetricDataBlockBaseContainer;
