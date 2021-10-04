import React from "react";
import PropTypes from "prop-types";

function ThreeLineDataBlockBase({ middleText, bottomText, topText, className}) {
  const getTopText = () => {
    if (topText) {
      return (
        <div>
          {topText}
        </div>
      );
    }
  };


  const getMiddleText = () => {
    if (middleText) {
      return (
        <div>
          {middleText}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (bottomText) {
      return (
        <div>
          {bottomText}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"text-center h-100"}>
        <div className="w-100 text-muted data-block-title-text">
          {getTopText()}
        </div>
        <div className="my-auto data-block-focal-text">
          {getMiddleText()}
        </div>
        <div className="mt-auto text-muted">
          {getSubtitle()}
        </div>
      </div>
    </div>
  );
}

ThreeLineDataBlockBase.propTypes = {
  topText: PropTypes.any,
  middleText: PropTypes.any,
  bottomText: PropTypes.any,
  className: PropTypes.string
};

export default ThreeLineDataBlockBase;