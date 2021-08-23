import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PipelinesOverviewMetrics from "components/insights/summary/metrics/pipelines_overview/PipelinesOverviewMetrics";
import PipelinesFailureScoreMetrics
  from "components/insights/summary/metrics/pipelines_failure_score/PipelinesFailureScoreMetrics";
import ValueStreamMetrics from "components/insights/summary/metrics/value_stream/ValueStreamMetrics";
import PipelineIncidentsMetrics from "components/insights/summary/metrics/incidents/PipelineIncidentsMetrics";
import PipelineAverageDurationMetrics
  from "components/insights/summary/metrics/pipelines_average_duration/PipelineAverageDurationMetrics";

function InsightsSynopsisDetails({ dashboardData }) {
  const [selectedDataBlock, setSelectedDataBlock] = useState("");
  const [dynamicPanel, setDynamicPanel] = useState(undefined);

  useEffect(() => {
    resetData();
  }, [dashboardData]);

  const resetData = () => {
    setSelectedDataBlock("");
    setDynamicPanel(undefined);
  };

  const toggleDynamicPanel = (name, dynamicPanel) => {
    if (selectedDataBlock === name) {
      resetData();
    } else {
      setSelectedDataBlock(name);
      setDynamicPanel(dynamicPanel);
    }
  };

  return (
    <div>
      <div className={"d-flex flex-wrap justify-content-around w-100"}>
        <PipelinesOverviewMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelinesFailureScoreMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <ValueStreamMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelineAverageDurationMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
        <PipelineIncidentsMetrics
          dashboardData={dashboardData}
          selectedDataBlock={selectedDataBlock}
          toggleDynamicPanel={toggleDynamicPanel}
        />
      </div>
      {dynamicPanel}
    </div>
  );
}

InsightsSynopsisDetails.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default InsightsSynopsisDetails;
