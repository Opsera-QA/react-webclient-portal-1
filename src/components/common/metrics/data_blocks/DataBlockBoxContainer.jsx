import React from "react";
import PropTypes from "prop-types";

function DataBlockBoxContainer({ children, className, onClickFunction}) {
  return (
    <div className={className}>
      <div className={"data-block-box"} onClick={onClickFunction}>
        {children}
      </div>
    </div>
  );
}

DataBlockBoxContainer.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClickFunction: PropTypes.func,
};

export default DataBlockBoxContainer;