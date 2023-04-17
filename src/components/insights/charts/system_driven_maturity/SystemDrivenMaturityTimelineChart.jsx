import React from "react";
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import ChartTooltip from 'components/insights/charts/ChartTooltip';
import { defaultConfig } from 'components/insights/charts/charts-views';
import config from './systemDrivenMaturityTimelineChartConfig';

const MAX_MATURITY_SCORE = 4;

function SystemDrivenMaturityTimelineChart ({ data }) {
  console.log('SDM Timeline Chart', { data });
  return (
    <ResponsiveLine
    data={data}
    {...defaultConfig("", "Date", false, true, "numbers", "monthDate2")}
    {...config()}
    yScale={{
      type: "linear",
      min: "0",
      max: MAX_MATURITY_SCORE,
      stacked: false,
      reverse: false,
    }}
    axisLeft={{
      tickValues: [0, MAX_MATURITY_SCORE],
      legend: "Maturity Score",
      legendOffset: -38,
      legendPosition: "middle",
    }}
    tooltip={(node) => (
      <ChartTooltip
        titles={["Date Range", "Maturity Score"]}
        values={[node.point.data.range, node.point.data.sdmScore]}
      />
    )}
    />
  );
}

SystemDrivenMaturityTimelineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.string,
          y: PropTypes.number,
          range: PropTypes.string,
          sdmScore: PropTypes.number
        })
      )
    })
  )
};

export default SystemDrivenMaturityTimelineChart;