import React from "react";
import PropTypes from "prop-types";

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
      <div className={"p-2 text-center"}>
        <div className="data-block">
          {getTitle()}
        </div>
        <div className="w-100 text-muted">
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