import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import { defaultConfig } from "components/insights/charts/charts-views";
import _ from "lodash";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GitlabMergeRequestLineChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";

function GitlabMergeRequestLineChartContainer({ openChart,closeChart }) {
  const [maxCharVal, setMaxChartVal] = useState(0);
  useEffect(() => {
    const dataFailedHigh = _.maxBy(openChart, "y");
    setMaxChartVal(dataFailedHigh.y);
  }, [closeChart]);

  let dailyDeploymentsChartData = [
    {
      id: "Average Open time",
      data: openChart
    },
    {
      id: "Average Merge time",
      data: closeChart,
    },
  ];

  const getTrendChart = () => {
    return (
      <>
        <div
            className={"mr-2"}
            style={{ float: "right", fontSize: "10px" }}
        >
          Average Open time
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
          <div className="row" />
          Average Merge time
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_2}
            iconSize={"lg"}
          />
        <div className="row" />
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
                legend: "Average Days",
                legendOffset: -38,
                legendPosition: "middle",
            }}
            sliceTooltip={({ slice }) => {
              return (
                <div className={"p-1 bg-white border border-dark"}>
                    <div>Date: {slice?.points[0]?.data?._id}</div>
                    <div className={'py-1'}
                         style={{
                           color: slice?.points[0]?.serieColor,
                         }}
                    >
                        Average Open Time: <strong>{slice?.points[0]?.data?.y}</strong>
                    </div>
                    <div className={'py-1'}
                         style={{
                           color: slice?.points[1]?.serieColor,
                         }}
                    >
                        Average Merge time: <strong>{slice?.points[1]?.data?.y}</strong>
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

GitlabMergeRequestLineChartContainer.propTypes = {
  openChart: PropTypes.object,
  closeChart: PropTypes.object,
};

export default GitlabMergeRequestLineChartContainer;
