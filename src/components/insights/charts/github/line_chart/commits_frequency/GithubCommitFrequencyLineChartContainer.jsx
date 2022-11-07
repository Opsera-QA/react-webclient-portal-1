import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import { defaultConfig } from "components/insights/charts/charts-views";
import _ from "lodash";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GithubCommitFrequencyLineChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";

function GithubCommitFrequencyLineChartContainer({ data }) {
  const [maxCharVal, setMaxChartVal] = useState(5);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setMaxChartVal(Math.max(...data.map(({ y }) => y)));
    setChartData([
      {
        id: 'commits',
        data
      }
    ]);
  }, [data]);

  console.log('LineChart', { maxCharVal, chartData });

  const getTrendChart = () => {
    return (
      <div id="seeme" style={{ minWidth: '100%', maxHeight: '450px' }}>
        <div
          className={"mr-2"}
          style={{ float: "right", fontSize: "10px" }}
        >
          Commits
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
        </div>
        <ResponsiveLine
          data={chartData}
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
            legend: "Commits",
            legendOffset: -38,
            legendPosition: "middle",
          }}
        />
      </div>
    );
  };

  return getTrendChart();
}

GithubCommitFrequencyLineChartContainer.propTypes = {
  data: PropTypes.array,
};

GithubCommitFrequencyLineChartContainer.defaultProps = {
  data: [],
};

export default GithubCommitFrequencyLineChartContainer;
