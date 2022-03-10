import React from "react";
import PropTypes from "prop-types";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function DataBlockBoxContainer({ children, className, onClickFunction, showBorder, dataPoint }) {
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

  if (dataPointHelpers.isDataPointVisible(dataPoint) === false) {
    return null;
  }

  return (
    <div className={className}>
      <div className={getDataBlockClassNames()} onClick={onClickFunction}>
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
