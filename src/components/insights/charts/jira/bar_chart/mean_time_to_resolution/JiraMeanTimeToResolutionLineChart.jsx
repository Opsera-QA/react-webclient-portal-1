import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import {
  defaultConfig,
  goalSuccessColor,
} from "components/insights/charts/charts-views";
import _ from "lodash";
import { faMinus, faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./JiraMeanTimeToResolutionConfigs";
import {
  METRIC_THEME_CHART_PALETTE_COLORS,
  METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY,
} from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import ChartTooltip from "../../../ChartTooltip";
import JiraMeanTimeToResolutionInsightsOverlay from "./JiraMeanTimeToResolutionInsightsOverlay";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";

function JiraMeanTimeToResolutionLineChart({ metrics }) {
  const toastContext = useContext(DialogToastContext);
  let mttrChartData = [
    {
      id: "MTTR",
      data: metrics,
    },
  ];
  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onNodeSelect = (node) => {
    toastContext.showOverlayPanel(
      <JiraMeanTimeToResolutionInsightsOverlay
        data={node?.data?.tickets || []}
        closePanel={closePanel}
      />
    );
  };

    const getTrendChart = () => {
    return (
      <>
        <div
          className={"mr-2"}
          style={{ float: "right", fontSize: "10px" }}
        >
          {/*Goal<b> ({goalsData})</b>*/}
          {/*<IconBase icon={faMinus} iconColor={goalSuccessColor} iconSize={"lg"} />*/}
          <div className="row" />
          Mean Time To Resolution{" "}
          <IconBase
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
        </div>
        <ResponsiveLine
          {...defaultConfig(
            "Mean Time to Resolution (in hours)",
            "Date",
            false,
            false,
            "wholeNumbers",
            "monthDate2",
          )}
          {...config(METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY, 0)}
          valueScale={{ type: "symlog" }}
          data={mttrChartData}
          onClick={(node) => onNodeSelect(node)}
          tooltip={({
            point: {
              data: { Count, x, y,range, maxMTTR },
            },
          }) => (
            <ChartTooltip
              titles={[
                "Date",
                "Average MTTR",
                "Max MTTR",
                "Number of Incidents",
              ]}
              values={[range, `${y} hours`,`${maxMTTR} hours`,  Count]}
              style={false}
            />
          )}
        />
      </>
    );
  };

  return getTrendChart();
}

JiraMeanTimeToResolutionLineChart.propTypes = {
  metrics: PropTypes.any,
};

export default JiraMeanTimeToResolutionLineChart;
