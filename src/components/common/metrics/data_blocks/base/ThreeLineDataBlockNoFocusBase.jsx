import React from "react";
import PropTypes from "prop-types";

// TODO: This needs to be reworked. Don't pass styles in. Have them be a part of the text passed in. That's why it's "any" and not string
//  Instead of using this, the standard ThreeLineDataBlockBase should be used and this should be removed
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
      return (
        <div className={`light-gray-text-secondary font-inter-light-300 metric-block-header-text ${topStyle}`}>
          {topText}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div className={`dark-gray-text-primary font-inter-light-500 metric-block-content-text ${middleStyle}`}>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div className={`light-gray-text-secondary font-inter-light-300 metric-block-footer-text ${bottomStyle}`}>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"text-center h-100"}>
        <div className="w-100 text-center">
          {getTopText()}
        </div>
        <div className="my-auto text-center">
          {getMiddleText()}
        </div>
        <div className="mt-auto text-center">
          {getSubtitle()}
        </div>
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
