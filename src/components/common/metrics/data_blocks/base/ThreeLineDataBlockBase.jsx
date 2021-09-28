import React from "react";
import PropTypes from "prop-types";

function ThreeLineDataBlockBase({ title, subtitle, topText, className}) {
  const getTopText = () => {
    if (topText) {
      return (
        <div>
          {topText}
        </div>
      );
    }
  };


  const getTitle = () => {
    if (title) {
      return (
        <div>
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div>
          {subtitle}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"px-2 text-center"}>
        <div className="mt-auto w-100 text-muted">
          {getTopText()}
        </div>
        <div className="py-3 data-block">
          {getTitle()}
        </div>
        <div className="w-100 text-muted">
          {getSubtitle()}
        </div>
      </div>
    </div>
  );
}

ThreeLineDataBlockBase.propTypes = {
  topText: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string
};

export default ThreeLineDataBlockBase;