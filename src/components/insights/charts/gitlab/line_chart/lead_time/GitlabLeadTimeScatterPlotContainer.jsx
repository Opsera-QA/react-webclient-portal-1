import React from "react";
import PropTypes from "prop-types";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import IconBase from "../../../../../common/icons/IconBase";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GitlabLeadTimeChartConfig";
function GitlabLeadTimeScatterPlotContainer({ chartData }) {
  const getScatterPlotsFromTimeStamp = (commit) => {
    const timestamp = commit["commitTimeStamp"];
    const hoursFraction = (timestamp.substr(11, 5).split(":")[1] / 60) * 100;

    return {
      x: new Date(timestamp),
      y: timestamp.substr(11, 2) + "." + hoursFraction,
      commitTimeStamp: new Date(timestamp).toLocaleString(),
      repositoryName: commit["repositoryName"],
      userName: commit["userName"],
      leadTime: commit["leadTime"],
      commitTitle: commit["commitTitle"],
    };
  };

  const getDeploymentMarkers = (deployment) => {
    return {
      axis: "x",
      value: new Date(deployment?.stepFinishedAt),
      lineStyle: {
        stroke: METRIC_THEME_CHART_PALETTE_COLORS.CHART_PALETTE_COLOR_2,
        strokeWidth: 2,
      },
      legendOrientation: "vertical",
      legendOffset: 10,
      legendPosition: "middle",
    };
  };

  const getDeploymentNodes = (deployment) => {
    const timestamp = deployment.stepFinishedAt;
    return {
      type: "deploy", // type not api not used here
      x: new Date(timestamp),
      y: 24,
      stepFinishedAt: new Date(timestamp).toLocaleString(),
      stepName: deployment?.stepName,
      deployAverageLeadTime: deployment?.deployAverageLeadTime,
      stepId: deployment?.stepId,
    };
  };
  const commitsData = [
    {
      id: "Commits Data",
      data: chartData.commits.map((item) =>
        getScatterPlotsFromTimeStamp(item["_id"]),
      ),
    },
    {
      id: "Deployment Data",
      data: chartData.deployments.map((item) => getDeploymentNodes(item)),
    },
  ];

  const markers = chartData.deployments.map((item) =>
    getDeploymentMarkers(item),
  );
  const getTrendChart = () => {
    return (
      <>
        <div
          className={"mr-2"}
          style={{ float: "right", fontSize: "10px" }}
        >
          Deployments
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_2}
            iconSize={"lg"}
          />
          <div className="row"></div>
          Commits
          <IconBase
            className={"ml-2"}
            icon={faSquare}
            iconColor={METRIC_THEME_CHART_PALETTE_COLORS?.CHART_PALETTE_COLOR_1}
            iconSize={"lg"}
          />
          <div className="row"></div>
        </div>
        <ResponsiveScatterPlot
          data={commitsData}
          {...config()}
          yScale={{ type: "linear", min: 0, max: 24 }}
          tooltip={({ node }) => {
            if (node?.data?.type === "deploy") {
              return (
                <div className={"p-1 bg-white border border-dark"}>
                  <div className={"py-1"}>
                    Job Id: <strong>{node?.data?.stepId}</strong>
                  </div>
                  <div className={"py-1"}>
                    Deployment Time: <strong>{node?.data?.stepFinishedAt}</strong>
                  </div>
                  <div className={"py-1"}>
                    Deployment Stage: <strong>{node?.data?.stepName}</strong>
                  </div>
                  <div className={"py-1"}>
                    Average Lead Time: <strong>{node?.data?.deployAverageLeadTime || "NA"}</strong> Day(s)
                  </div>
                </div>
              );
            }
            return (
              <div className={"p-1 bg-white border border-dark"}>
                <div className={"py-1"}>
                  Repository: <strong>{node?.data?.repositoryName}</strong>
                </div>
                <div className={"py-1"}>
                  Title: <strong>{node?.data?.commitTitle}</strong>
                </div>
                <div className={"py-1"}>
                  Author: <strong>{node?.data?.userName}</strong>
                </div>
                <div className={"py-1"}>
                  LeadTime: <strong>{node?.data?.leadTime}</strong> Day(s)
                </div>
                <div className={"py-1"}>
                  CommitTime: <strong>{node?.data?.commitTimeStamp}</strong>
                </div>
              </div>
            );
          }}
          markers={markers}
        />
      </>
    );
  };

  return getTrendChart();
}

GitlabLeadTimeScatterPlotContainer.propTypes = {
  chartData: PropTypes.object,
};

export default GitlabLeadTimeScatterPlotContainer;
