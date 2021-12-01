import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function StrategicCriteriaInfoPanel({ dataPoints }) {
  const getDataPointInfoPanels = () => {

  };

  if (!Array.isArray(dataPoints)) {
    return null;
  }

  return (
    <div>

    </div>
  );
}

StrategicCriteriaInfoPanel.propTypes = {
  dataPoints: PropTypes.Array,
};

export default StrategicCriteriaInfoPanel;