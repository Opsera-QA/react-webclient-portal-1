import React from "react";
import PropTypes from "prop-types";
import DataPointInfoPanel from "components/common/metrics/panels/strategic_criteria/data_point/DataPointInfoPanel";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

function DataBlockInfoOverlay(
  {
    dataPoint,
  }) {

  if (objectHelpers.isObject(dataPoint) !== true) {
    return null;
  }

  return (
    <DataPointInfoPanel
      dataPoint={dataPoint}
    />
  );
}

DataBlockInfoOverlay.propTypes = {
  dataPoint: PropTypes.object,
};

export default DataBlockInfoOverlay;