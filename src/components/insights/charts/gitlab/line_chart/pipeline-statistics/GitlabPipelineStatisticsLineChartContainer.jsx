import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import { defaultConfig } from "components/insights/charts/charts-views";
import _ from "lodash";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GitlabPipelineStatisticsLineChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";

function GitlabPipelineStatisticsLineChartContainer({ chartData }) {
  const [maxCharVal, setMaxChartVal] = useState(0);
  useEffect(() => {
    const dataSuccessHigh = _.maxBy(chartData.success, "y");
    const dataFailedHigh = _.maxBy(chartData.failed, "y");
    const dataSkippedHigh = _.maxBy(chartData.skipped, "y");
    const dataCancelledHigh = _.maxBy(chartData.cancelled, "y");
    const high = Math.max(dataSuccessHigh?.y,dataFailedHigh?.y,dataSkippedHigh?.y,dataCancelledHigh?.y );
    setMaxChartVal(Math.ceil(high));
  }, [chartData]);

  let dailyDeploymentsChartData = [
    {
      id: "Success Data",
      data: chartData.success,
    },
    {
      id: "Failed Data",
      data: chartData.failed,
    },
    {
      id: "Skipped Data",
      data: chartData.skipped,
    },
    {
      id: "Cancelled Data",
      data: chartData.cancelled,
    },
  ];

  const getTrendChart = () => {
    return (
      <>
        <div
          className={"mr-2"}
          style={{ float: "right", fontSize: "10px" }}
        >
          Successful Pipelines
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
          <div className="row" />
          Failed Pipelines
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_2}
            iconSize={"lg"}
          />
          <div className="row" />
          Skipped Pipelines
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_3}
            iconSize={"lg"}
          />
          <div className="row" />
          Cancelled Pipelines
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_4}
            iconSize={"lg"}
          />
        </div>
        <ResponsiveLine
          data={dailyDeploymentsChartData}
          {...defaultConfig("", "Date", false, true, "numbers", "monthDate2")}
          {...config()}
          yScale={{
            type: "linear",
            min: "0",
            max: maxCharVal,
            stacked: false,
            reverse: false,
          }}
          axisLeft={{
            tickValues: [0, maxCharVal],
            legend: "Avg Daily Pipelines",
            legendOffset: -38,
            legendPosition: "middle",
          }}
          sliceTooltip={({ slice }) => {
            return (
              <div className={"p-1 bg-white border border-dark"}>
                <div>Date: {slice?.points[0]?.data?.range}</div>
                <div className={'py-1'}
                  style={{
                    color: slice?.points[3]?.serieColor,
                  }}
                >
                  Successful Pipelines: <strong>{slice?.points[3]?.data?.total}</strong>
                </div>
                <div className={'py-1'}
                  style={{
                    color: slice?.points[2]?.serieColor,
                  }}
                >
                  Failed Pipelines: <strong>{slice?.points[2]?.data?.y}</strong>
                </div>
                <div className={'py-1'}
                  style={{
                   color: slice?.points[1]?.serieColor,
                  }}
                >
                  Skipped Pipelines: <strong>{slice?.points[1]?.data?.y}</strong>
                </div>
                <div className={'py-1'}
                 style={{
                   color: slice?.points[0]?.serieColor,
                 }}
                >
                  Cancelled Pipelines: <strong>{slice?.points[0]?.data?.y}</strong>
                </div>
              </div>
            );
          }}
        />
      </>
    );
  };

  return getTrendChart();
}

GitlabPipelineStatisticsLineChartContainer.propTypes = {
  chartData: PropTypes.object,
};

export default GitlabPipelineStatisticsLineChartContainer;
