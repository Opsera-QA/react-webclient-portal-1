import React from "react";
import PropTypes from "prop-types";
import IconBase from "components/common/icons/IconBase";

function ThreeLineDataBlockBase({ middleText, bottomText, topText, className, icon}) {
  const getLeftDataBlockIcon = () => {
    if (icon) {
      return (
        <div className={"data-block-left-icon"}>
          <IconBase icon={icon}  />
        </div>
      );
    }
  };

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
        {getLeftDataBlockIcon()}
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
  className: PropTypes.string,
  icon: PropTypes.object,
};

export default ThreeLineDataBlockBase;