import React from "react";
import PropTypes from "prop-types";
import DataPointInfoPanel
  from "components/common/metrics/panels/strategic_criteria/data_point/DataPointInfoPanel";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

function MetricDataPointsInfoPanel({ dataPoints }) {
  const getDataPointInfoPanels = () => {
    if (dataPoints.length === 0) {
      return "No Data Point Evaluation Rules Configured.";
    }

    return (
      dataPoints.map((dataPoint, index) => {
        return (
          <DataPointInfoPanel
            dataPoint={dataPoint}
            key={index}
          />
        );
      })
    );
  };

  if (!Array.isArray(dataPoints)) {
    return null;
  }

  return (
    <div>
      <H5FieldSubHeader subheaderText={"Data Points"} />
      {getDataPointInfoPanels()}
    </div>
  );
}

MetricDataPointsInfoPanel.propTypes = {
  dataPoints: PropTypes.array,
};

export default MetricDataPointsInfoPanel;