import React from "react";
import PropTypes from "prop-types";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {hasStringValue} from "components/common/helpers/string-helpers";

function DataBlockBoxContainer(
  {
    children,
    className,
    onClickFunction,
    showBorder,
    dataPoint,
  }) {
  const getDataBlockClassNames = () => {
    let className = "h-100";

    if (showBorder === true) {
      className += " data-block-box";
    }

    if (onClickFunction != null) {
      className = className + " pointer";
    }

    return className;
  };

  const getClassNames = () => {
    return hasStringValue(className) === true ? `h-100 ${className}` : `h-100`;
  };

  if (dataPointHelpers.isDataPointVisible(dataPoint) === false) {
    return null;
  }

  return (
    <div className={getClassNames()}>
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
  dataPoint: PropTypes.object,
};

export default DataBlockBoxContainer;