import React from "react";
import PropTypes from "prop-types";

function TwoLineDataBlockBase({ title, subtitle, className}) {
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
      <div className={"p-2 text-center"}>
        <div className="data-block-focal-text">
          {getTitle()}
        </div>
        <div className="w-100 text-muted">
          {getSubtitle()}
        </div>
      </div>
    </div>
  );
}

TwoLineDataBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string
};

export default TwoLineDataBlockBase;