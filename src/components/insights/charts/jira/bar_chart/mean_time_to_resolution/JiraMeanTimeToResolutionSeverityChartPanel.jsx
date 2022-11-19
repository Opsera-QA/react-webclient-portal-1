import React from 'react';
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import ChartTooltip from "../../../ChartTooltip";
import { defaultConfig, adjustBarWidth } from "../../../charts-views";
import config2 from "./JiraSeverityCountConfig.js";

function JiraMeanTimeToResolutionSeverityChartPanel({ severityChartData, closePanel }) {
  return (
    <FullScreenCenterOverlayContainer titleText="Number of Incidents" closePanel={closePanel}>
      <div className='mt-3 h-100'>
        <ResponsiveBar
          data={severityChartData}
          {...defaultConfig(
            "Number of Incidents",
            "Severity",
            false,
            false,
            "wholeNumbers",
          )}
          {...config2(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY, 0)}
          valueScale={{ type:'symlog'}}
          {...adjustBarWidth(severityChartData)}
          tooltip={({ indexValue, value }) => (
            <ChartTooltip
              titles={["Priority", "Number of Incidents"]}
              values={[indexValue, `${value}`]}
              style={false}
            />
          )}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

JiraMeanTimeToResolutionSeverityChartPanel.propTypes = {
  severityChartData: PropTypes.shape({
    id: PropTypes.oneOf([ PropTypes.string, PropTypes.number ]),
    data: PropTypes.array
  }),
  closePanel: PropTypes.func.isRequired
};

export default JiraMeanTimeToResolutionSeverityChartPanel;