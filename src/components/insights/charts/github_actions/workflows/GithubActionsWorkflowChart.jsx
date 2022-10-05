import React, { useState } from "react";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import PropTypes from "prop-types";
import GithubActionsWorkflowDataBlocks
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowDataBlocks";
import GithubActionsWorkflowTableOverlay
  from "components/insights/charts/github_actions/workflows/GithubActionsWorkflowTableOverlay";

function GithubActionsWorkflowChart(
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
        <GithubActionsWorkflowDataBlocks
          kpiConfiguration={kpiConfiguration}
          dashboardData={dashboardData}
          setError={setError}
        />
        <GithubActionsWorkflowTableOverlay
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

GithubActionsWorkflowChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default GithubActionsWorkflowChart;