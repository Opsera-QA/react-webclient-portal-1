import React from "react";
import PropTypes from "prop-types";

export default function SideBySideViewBase(
  {
    leftSideView,
    rightSideView,
    leftSideMinimumWidth,
    rightSideMinimumWidth,
    minimumHeight,
    maximumHeight,
    overflowYBodyStyle,
    overflowXBodyStyle,
  }) {
  const getRightSideStylingObject = () => {
    return ({
      minWidth: rightSideMinimumWidth,
      minHeight: minimumHeight,
      overflowY: overflowYBodyStyle,
      overflowX: overflowXBodyStyle,
    });
  };

  const getLeftSideStylingObject = () => {
    return ({
      minWidth: leftSideMinimumWidth,
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: overflowYBodyStyle,
      overflowX: overflowXBodyStyle,
    });
  };

  return (
    <div
      className={"d-flex w-100 h-100"}
    >
      <div className={"makeup-tree-container"}>
        <div style={getLeftSideStylingObject()} className={"h-100 w-100"}>
          {leftSideView}
        </div>
      </div>
      <div className={"flex-fill h-100 w-100"}>
        <div style={getRightSideStylingObject()}>
          {rightSideView}
        </div>
      </div>
    </div>
  );
}

SideBySideViewBase.propTypes = {
  leftSideView: PropTypes.object,
  rightSideView: PropTypes.object,
  leftSideMinimumWidth: PropTypes.string,
  rightSideMinimumWidth: PropTypes.string,
  bodyClassName: PropTypes.string,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
  overflowYBodyStyle: PropTypes.string,
  overflowXBodyStyle: PropTypes.string,
};

SideBySideViewBase.defaultProps = {
  bodyClassName: "mx-0",
};