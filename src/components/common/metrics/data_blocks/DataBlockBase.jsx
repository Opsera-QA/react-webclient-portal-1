import React from "react";
import PropTypes from "prop-types";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function DataBlockBase({ title, subtitle, className}) {
  const getTitle = () => {
    if (title) {
      return (
        <div className="">
          {title}
        </div>
      );
    }
  };

  const getSubtitle = () => {
    if (subtitle) {
      return (
        <div className="">
          {subtitle}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"p-3 text-center"}>
        <div className="data-block">
          {getTitle()}
        </div>
        <div className="w-100 text-muted mb-1">
          {getSubtitle()}
        </div>
      </div>
    </div>
  );
}

DataBlockBase.propTypes = {
  title: PropTypes.any,
  subtitle: PropTypes.any,
  className: PropTypes.string
};

export default DataBlockBase;