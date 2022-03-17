import React from "react";
import PropTypes from "prop-types";
import {faBezierCurve} from "@fortawesome/pro-light-svg-icons";
import DataPointStrategicCriteriaInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/DataPointStrategicCriteriaInfoPanel";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {objectHelpers} from "components/common/helpers/object/object.helpers";
import MetricInfoContainer from "components/common/containers/MetricInfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";

function DataPointInfoPanel({ dataPoint, className }) {
  const getDescription = () => {
    if (hasStringValue(dataPoint?.description) === true) {
      return (
        <div className={"mb-2 mx-2"}>
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
    <MetricInfoContainer
      className={className}
      titleIcon={faBezierCurve}
      titleText={dataPoint?.name}
    >
      {getDescription()}
      <DataPointStrategicCriteriaInfoPanel
        className={"p-2"}
        strategicCriteria={dataPointHelpers.getDataPointStrategicCriteria(dataPoint)}
      />
    </MetricInfoContainer>
  );
}

DataPointInfoPanel.propTypes = {
  dataPoint: PropTypes.object,
  className: PropTypes.string,
};

export default DataPointInfoPanel;