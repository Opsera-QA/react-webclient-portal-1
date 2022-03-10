import React from "react";
import PropTypes from "prop-types";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";

function ChartContainer(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    chart,
    isLoading,
    error,
    loadChart,
    setKpis,
    chartHelpComponent,
    settingsHelpComponent,
    showSettingsToggle,
    launchActionableInsightsFunction,
  }) {
  return (
    <VanityMetricContainer
      kpiConfiguration={kpiConfiguration}
      setKpiConfiguration={setKpiConfiguration}
      dashboardData={dashboardData}
      index={index}
      chart={chart}
      isLoading={isLoading}
      error={error}
      loadChart={loadChart}
      setKpis={setKpis}
      chartHelpComponent={chartHelpComponent}
      settingsHelpComponent={settingsHelpComponent}
      showSettingsToggle={showSettingsToggle}
      launchActionableInsightsFunction={launchActionableInsightsFunction}
    />
  );
}

ChartContainer.propTypes = {
  chart: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  error: PropTypes.object,
  isLoading: PropTypes.bool,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadChart: PropTypes.func,
  chartHelpComponent: PropTypes.func,
  settingsHelpComponent: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
  launchActionableInsightsFunction: PropTypes.func,
};

export default ChartContainer;
