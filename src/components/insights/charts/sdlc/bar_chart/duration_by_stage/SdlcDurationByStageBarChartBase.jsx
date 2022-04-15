import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import config from "./sdlcDurationByStageBarChartConfigs";
import { defaultConfig } from "components/insights/charts/charts-views";
import ChartTooltip from "components/insights/charts/ChartTooltip";
import { DialogToastContext } from "contexts/DialogToastContext";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import MetricBadgeBase from "components/common/badges/metric/MetricBadgeBase";
import SdlcDurationByStageActionableInsightOverlay from "./actionable_insights/SdlcDurationByStageActionableInsightOverlay";
function SdlcDurationByStageBarChartBase({ metric, kpiConfiguration, dashboardData }) {
  const toastContext = useContext(DialogToastContext);
  const onNodeSelect = (node) => {
    let title = node.serieId;
    toastContext.showOverlayPanel(
      <SdlcDurationByStageActionableInsightOverlay
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
    <div style={{ height: "150px" }} >
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
            values={[node.point.data.range, String(node.point.data.yFormatted) + " minutes", node.point.data.count]}
          />
        )}
        onClick={(node) => onNodeSelect(node)}
      />
    </div>
  );
}

SdlcDurationByStageBarChartBase.propTypes = {
  metric: PropTypes.array,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SdlcDurationByStageBarChartBase;
