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
    overflowYContainerStyle,
  }) {
  const getContainerStylingObject = () => {
    return ({
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
      overflowY: overflowYContainerStyle,
    });
  };

  const getRightSideStylingObject = () => {
    return ({
      minWidth: rightSideMinimumWidth,
      minHeight: minimumHeight,
      maxHeight: maximumHeight,
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
      style={getContainerStylingObject()}
    >
      <div className={"px-0 makeup-tree-container"}>
        <div style={getLeftSideStylingObject()} className={"h-100"}>
          {leftSideView}
        </div>
      </div>
      <div>
        <div style={getRightSideStylingObject()}>
          {rightSideView}
        </div>
      </Col>
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
  overflowYContainerStyle: PropTypes.string,
};

SideBySideViewBase.defaultProps = {
  bodyClassName: "mx-0",
};