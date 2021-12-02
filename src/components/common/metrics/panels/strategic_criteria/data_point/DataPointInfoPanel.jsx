import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import DataPointStrategicCriteriaInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/DataPointStrategicCriteriaInfoPanel";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

function DataPointInfoPanel({ dataPoint, className }) {
  if (dataPoint == null || typeof dataPoint !== "object") {
    return null;
  }

  console.log("dataPoint: " + JSON.stringify(dataPoint));

  // TODO: Should we show attributes like type?
  return (
    <InfoContainer
      className={className}
      titleIcon={faBezierCurve}
      titleText={dataPoint?.name}
    >
      <DataPointStrategicCriteriaInfoPanel
        strategicCriteria={dataPointHelpers.getDataPointStrategicCriteria(dataPoint)}
      />
    </InfoContainer>
  );
}

DataPointInfoPanel.propTypes = {
  dataPoint: PropTypes.object,
  className: PropTypes.string,
};

export default DataPointInfoPanel;