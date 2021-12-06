import React from "react";
import PropTypes from "prop-types";
import InfoContainer from "components/common/containers/InfoContainer";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import DataPointStrategicCriteriaInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/DataPointStrategicCriteriaInfoPanel";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

function DataPointInfoPanel({ dataPoint, className }) {
  const getDescription = () => {
    if (dataPoint?.description) {
      return (
        <div className={"m-2"}>
          {dataPoint?.description}
        </div>
      );
    }
  };

  if (objectHelpers.isObject(dataPoint) !== true) {
    return null;
  }

  // TODO: The body should probably be a summary panel. Should we show attributes like type?
  return (
    <InfoContainer
      className={className}
      titleIcon={faBezierCurve}
      titleText={dataPoint?.name}
    >
      {getDescription()}
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