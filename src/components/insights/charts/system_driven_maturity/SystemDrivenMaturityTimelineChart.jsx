import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import ChartTooltip from 'components/insights/charts/ChartTooltip';
import { defaultConfig } from 'components/insights/charts/charts-views';
import systemDrivenMaturityTimelineChartConfig from './systemDrivenMaturityTimelineChartConfig';

const getMonthDifference = (startDate, endDate) => {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
};

function SystemDrivenMaturityTimelineChart ({ data }) {
  const dynamicDateFormat = (d) => {
    let date = new Date(d).toUTCString();
    date = date.split(" ");
  
    let length = data[0]?.data?.length;
    let minDate = data[0]?.data[0]?.x;
    let maxDate = data[0]?.data[length-1]?.x;
  
    let monthDiff  = getMonthDifference(new Date(minDate), new Date(maxDate));
  
    console.log(monthDiff);
  
    if(monthDiff < 12){
      return date[2] + " " + date[1];
    }
    return date[2] + " " + date[3];
  };

  return (
    <ResponsiveLine
      data={data}
      {...defaultConfig("Maturity Score", "Date", false, true, "wholeNumbers", "monthDate2")}
      {...systemDrivenMaturityTimelineChartConfig()}
      tooltip={({ point: { data: { range, text, y} } }) => 
        <ChartTooltip
          key={range}
          titles={[text]}
          values={[y]}
        />
      }
      axisBottom={{
        format: dynamicDateFormat,
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: "Date",
        legendOffset: 60,
        legendPosition: "middle",
      }}
    />
  );
}

SystemDrivenMaturityTimelineChart.propTypes = {
  data: PropTypes.array
};

export default SystemDrivenMaturityTimelineChart;