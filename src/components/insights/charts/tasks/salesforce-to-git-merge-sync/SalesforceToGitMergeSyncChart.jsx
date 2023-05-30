import React, { useState } from "react";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import SalesforceToGitMergeSyncDataBlocks from "./SalesforceToGitMergeSyncDataBlocks";
import SalesforceToGitMergeTableOverlay from "./SalesforceToGitMergeTableOverlay";

function SalesforceToGitMergeSyncChart(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    setKpis,
    showSettingsToggle,
  }) {
  const [error, setError] = useState(undefined);

  const getChartBody = () => {
    return (
      <div className={"new-chart"}>
        <SalesforceToGitMergeSyncDataBlocks
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          setError={setError}
        />
        <SalesforceToGitMergeTableOverlay
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          setError={setError}
        />
      </div>
    );
  };

  return (
    <ChartContainer
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      chart={getChartBody()}
      dashboardData={dashboardData}
      index={index}
      setKpis={setKpis}
      showSettingsToggle={showSettingsToggle}
      error={error}
    />
  );
}

SalesforceToGitMergeSyncChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default SalesforceToGitMergeSyncChart;
