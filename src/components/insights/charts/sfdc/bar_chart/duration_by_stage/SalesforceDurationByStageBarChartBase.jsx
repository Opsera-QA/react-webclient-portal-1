import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./salesforceDurationByStageBarChartConfigs";
import { defaultConfig } from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import { DialogToastContext } from "contexts/DialogToastContext";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import SalesforceDurationByStageActionableInsightsOverlay from "./actionable_insights/SalesforceDurationByStageActionableInsightOverlay";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";

function SalesforceDurationByStageBarChartBase({ metric, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const onNodeSelect = (node) => {
    let title = node.serieId;
    toastContext.showOverlayPanel(
      <SalesforceDurationByStageActionableInsightsOverlay
        title={title}
        actionableInsightsQueryData={node}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
  };
  const max = metric && metric[0] && metric[0].max;
  const min = metric && metric[0] && metric[0].min;

  return (
    <div style={{ height: "150px" }}>
      <div className="text-right pr-3">
        {min ? <MetricBadgeBase badgeText={`Minimum: ${min} Minutes`} /> : ''}
        {max ? <MetricBadgeBase badgeText={`Maximum: ${max} Minutes`} /> : ''}
      </div>
      <ResponsiveLine
        data={metric}
        {...defaultConfig("Duration (min)", "Date", false, true, "wholeNumbers", "monthDate")}
        {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
        enableGridX={false}
        enableGridY={false}
        tooltip={(node) => (
          <ChartTooltip
            titles={["Date Range", "Average Duration", "Number of Executions"]}
            values={[
              node.point.data.range,
              String(node.point.data.yFormatted) + " minutes",
              node.point.data.count + " runs",
            ]}
          />
        )}
        onClick={(node) => onNodeSelect(node)}
      />
    </div>
  );
}

SalesforceDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SalesforceDurationByStageBarChartBase;
