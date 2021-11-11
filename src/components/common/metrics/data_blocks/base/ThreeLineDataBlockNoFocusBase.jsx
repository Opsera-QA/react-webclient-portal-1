import React from "react";
import PropTypes from "prop-types";

function ThreeLineDataBlockNoFocusBase({
  middleText,
  bottomText,
  topText,
  className,
  topStyle,
  middleStyle,
  bottomStyle,
}) {
  const getTopText = () => {
    if (topText) {
      return <div style={topStyle}>{topText}</div>;
    }
  };

  const getMiddleText = () => {
    if (middleText) {
      return <div style={middleStyle}>{middleText}</div>;
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return <div style={bottomStyle}>{bottomText}</div>;
    }
  };

  return (
    <div className={className}>
      <div className={"text-center h-100"}>
        <div className="w-100 text-muted data-block-title-text">{getTopText()}</div>
        <div className="my-auto data-block-focal-text">{getMiddleText()}</div>
        <div className="mt-auto text-muted">{getSubtitle()}</div>
      </div>
    </div>
  );
}

ThreeLineDataBlockNoFocusBase.propTypes = {
  topText: PropTypes.any,
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string,
  topStyle: PropTypes.string,
  middleStyle: PropTypes.string,
  bottomStyle: PropTypes.string,
};

export default ThreeLineDataBlockNoFocusBase;
