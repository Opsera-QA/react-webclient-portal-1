import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import { defaultConfig } from "components/insights/charts/charts-views";
import _ from "lodash";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GitlabDeploymentFrequencyLineChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import GitlabDeploymentActionablePipelinesOverlay
    from "./actionable_insights/GitlabDeploymentActionablePipelinesOverlay";
import GitlabDeploymentActionableDeployOverlay from "./actionable_insights/GitlabDeploymentActionableDeployOverlay";
import ChartTooltip from "../../ChartTooltip";
import GitlabDeploymentFreqActionableMasterTab
    from "./actionable_insights/tabs/GitlabDeploymentFreqActionableMasterTab";


function GitlabDeploymentFrequencyLineChartContainer({ chartData, kpiConfiguration, dashboardData }) {
  const [maxCharVal, setMaxChartVal] = useState(0);
    const toastContext = useContext(DialogToastContext);

  useEffect(() => {
    let dataStepHigh = _.maxBy(chartData.step, "y");
    let dataPipeLineHigh = _.maxBy(chartData.pipeline, "y");

    const high = Math.max(dataPipeLineHigh?.y,dataStepHigh?.y);
    setMaxChartVal(Math.ceil(high));
  }, [chartData]);

  let dailyDeploymentsChartData = [
    {
      id: "Pipeline Data",
      data: chartData.pipeline,
    },
    {
      id: "Stage Data",
      data: chartData.step,
    },
  ];

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    const onNodeSelect = (node) => {
        toastContext.showOverlayPanel(
            <GitlabDeploymentFreqActionableMasterTab
                kpiConfiguration={kpiConfiguration}
                dashboardData={dashboardData}
                start={node?.data?.x}
                end={node?.data?.upperBound}
                range={node?.data?.range}
                type={node?.data?.type}
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
          Average Daily Pipelines
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
          <div className="row" />
          Average Daily Deployments
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_2}
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
            legend: "Avg Daily Deployments",
            legendOffset: -38,
            legendPosition: "middle",
          }}
          onClick={(node) => onNodeSelect(node)}
          tooltip={(node) => (
              <ChartTooltip
              titles={["Type","Date Range", "Total Runs", "Average"]}
              values={[ node.point.data.type, node.point.data.range, node.point.data.total, node.point.data.y]}
              />
          )}
          // sliceTooltip={({ slice }) => {
          //     return (
          //         <div className={"p-1 bg-white border border-dark"}>
          //             <div>Date: {slice?.points[0]?.data?.range}</div>
          //             <div className={'py-1'}
          //                  style={{
          //                      color: slice?.points[0]?.serieColor,
          //                  }}
          //             >
          //                 Total Deployments:
          //                 <strong>{slice?.points[0]?.data?.total}</strong>
          //             </div>
          //             <div className={'py-1'}
          //                  style={{
          //                      color: slice?.points[0]?.serieColor,
          //                  }}
          //             >
          //                 Average Deployments: <strong>{slice?.points[0]?.data?.y}</strong>
          //             </div>
          //             <div className={'py-1'}
          //                  style={{
          //                      color: slice?.points[1]?.serieColor,
          //                  }}
          //             >
          //                 Total Pipelines: <strong>{slice?.points[1]?.data?.total}</strong>
          //             </div>
          //         </div>
          //     );
          // }}
        />
      </>
    );
  };

  return getTrendChart();
}

GitlabDeploymentFrequencyLineChartContainer.propTypes = {
  chartData: PropTypes.object,
};

export default GitlabDeploymentFrequencyLineChartContainer;
