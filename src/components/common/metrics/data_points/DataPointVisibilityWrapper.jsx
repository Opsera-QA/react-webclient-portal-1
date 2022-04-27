import React from "react";
import PropTypes from "prop-types";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function DataPointVisibilityWrapper(
  {
    children,
    dataPoint,
  }) {
  if (dataPointHelpers.isDataPointVisible(dataPoint) === false) {
    return null;
  }

  return (children);
}

DataPointVisibilityWrapper.propTypes = {
  children: PropTypes.any,
  dataPoint: PropTypes.object,
};

export default DataPointVisibilityWrapper;