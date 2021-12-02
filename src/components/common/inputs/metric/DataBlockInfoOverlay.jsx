import React from "react";
import PropTypes from "prop-types";
import DataPointInfoPanel from "components/common/metrics/panels/strategic_criteria/data_point/DataPointInfoPanel";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

function DataBlockInfoOverlay(
  {
    dataPoint,
    dataBlockInfoPanel,
  }) {

  if (objectHelpers.isObject(dataPoint) !== true && dataBlockInfoPanel == null) {
    return null;
  }

  return (
    <div>
      {dataBlockInfoPanel}
      <DataPointInfoPanel
        dataPoint={dataPoint}
      />
    </div>
  );
}

DataBlockInfoOverlay.propTypes = {
  dataPoint: PropTypes.object,
  dataBlockInfoPanel: PropTypes.any,
};

export default DataBlockInfoOverlay;