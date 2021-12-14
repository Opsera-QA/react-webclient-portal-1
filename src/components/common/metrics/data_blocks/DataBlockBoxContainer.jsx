import React from "react";
import PropTypes from "prop-types";

function DataBlockBoxContainer({ children, className, onClickFunction, showBorder}) {
  const getDataBlockClassNames = () => {
    let className = "";

    if (showBorder === true) {
      className = "data-block-box";
    }

    if (onClickFunction != null) {
      className = className.length > 0 ? className + " pointer" : "pointer";
    }

    return className;
  };

  return (
    <div className={className}>
      <div
        className={getDataBlockClassNames()}
        onClick={onClickFunction}
      >
        {children}
      </div>
    </div>
  );
}

DataBlockBoxContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClickFunction: PropTypes.func,
  showBorder: PropTypes.bool,
};

export default DataBlockBoxContainer;