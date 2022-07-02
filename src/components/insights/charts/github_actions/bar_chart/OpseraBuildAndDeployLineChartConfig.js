import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

export default () => ({
  enableGridX: false,
  enableGridY: false,
  yScale: { 
    type: 'linear', 
    min: '0', 
    max: '100', 
    stacked: false, 
    reverse: false 
  },
  xFormat: "time:%Y-%m-%d",  
  colors:  METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_1,
  axisLeft: {
    tickValues: [0, 50, 100],
    legend: 'Success Rate %',
    legendOffset: -40,
    legendPosition: 'middle'
  },
  axisBottom: {
    format: d => { var date = new Date(d).toUTCString(); date = date.split(" "); return date[2]+" "+date[1]; },
    tickRotation: -45,
    legend: 'Date',
    legendOffset: 55,
    legendPosition: 'middle'
  },
  layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh'],
  pointSize: 6  
});
