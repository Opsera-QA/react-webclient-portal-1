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

  const getTrendChart = () => {
    return (
      <div id="seeme" style={{ minWidth: '100%', maxHeight: '300px' }}>
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
          sliceTooltip={({ slice }) => (
            <div style={{ background: 'white', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '0.25rem', padding: '0.5rem' }}>
              {slice.points.map(({ id, data: { title, x, byRepo }, serieColor }) => (
                <div key={id}>
                  <div>{title}</div>
                  {Object.keys(byRepo).map((key) => (
                    <div key={key} style={{ color: serieColor }}>
                      <strong>{byRepo[key].name}</strong> [{byRepo[key].count}]
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
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
