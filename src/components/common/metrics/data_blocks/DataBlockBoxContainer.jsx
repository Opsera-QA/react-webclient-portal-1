import React from "react";
import PropTypes from "prop-types";

function DataBlockBoxContainer({ children, className, onClickFunction, showBorder}) {
  return (
    <div className={className}>
      <div
        className={showBorder === true ? "data-block-box" : ""}
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