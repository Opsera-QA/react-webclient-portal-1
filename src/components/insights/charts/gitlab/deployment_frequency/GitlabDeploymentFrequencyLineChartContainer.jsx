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
import GitlabDeploymentFreqActionableMasterTab from "./actionable_insights/GitlabDeploymentFreqActionableMasterTab";
import JiraChangeFailureRateInsightsOverlay
    from "../../jira/line_chart/change_failure_rate/JiraChangeFailureRateInsightsOverlay";
import GitlabDeploymentActionablePipelinesOverlay
    from "./actionable_insights/GitlabDeploymentActionablePipelinesOverlay";
import GitlabDeploymentActionableDeployOverlay from "./actionable_insights/GitlabDeploymentActionableDeployOverlay";


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

    // const onNodeSelect = (node) => {
    //     console.log("inside loop", node);
    //     if(node?.points[0]) {
    //         toastContext.showOverlayPanel(
    //             <GitlabDeploymentFreqActionableMasterTab
    //                 data={node || []}
    //                 closePanel={closePanel}
    //             />
    //         );
    //     }
    //     if(node?.points[1]) {
    //         toastContext.showOverlayPanel(
    //             <GitlabDeploymentFreqActionableMasterTab
    //                 data={node || []}
    //                 closePanel={closePanel}
    //             />
    //         );
    //     }
    // };

    const onNodeSelect = (node) => {
        console.log("inside loop", node);
        if(node?.data?.type === "pipeline") {
            toastContext.showOverlayPanel(
                <GitlabDeploymentActionablePipelinesOverlay
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            );
        }
        if(node?.data?.type === "deployment") {
            toastContext.showOverlayPanel(
                <GitlabDeploymentActionableDeployOverlay
                    kpiConfiguration={kpiConfiguration}
                    dashboardData={dashboardData}
                />
            );
        }
    };

    // const onNodeSelect = (node) => {
    //     if(node?.data?.type === "deploy"){
    //         setShowModal(true);
    //         setModalData(node?.data?.commits || []);
    //     }
    // };

    // const onRowSelect = (data) => {
    //     toastContext.showOverlayPanel(
    //         <GitScrapperActionableInsightOverlay
    //             kpiConfiguration={kpiConfiguration}
    //             dashboardData={dashboardData}
    //             title={data?.label}
    //             gitScrapperType={data?.type}
    //         />,
    //     );
    // };


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
          // sliceTooltip={({ slice }) => {
          //   return (
          //     <div className={"p-1 bg-white border border-dark"}>
          //       <div>Date: {slice?.points[0]?.data?.range}</div>
          //       <div className={'py-1'}
          //         style={{
          //           color: slice?.points[0]?.serieColor,
          //         }}
          //       >
          //         Total Deployments:
          //         <strong>{slice?.points[0]?.data?.total}</strong>
          //       </div>
          //       <div className={'py-1'}
          //         style={{
          //           color: slice?.points[0]?.serieColor,
          //         }}
          //       >
          //         Average Deployments: <strong>{slice?.points[0]?.data?.y}</strong>
          //       </div>
          //       <div className={'py-1'}
          //         style={{
          //           color: slice?.points[1]?.serieColor,
          //         }}
          //       >
          //         Total Pipelines: <strong>{slice?.points[1]?.data?.total}</strong>
          //       </div>
          //     </div>
          //   );
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
