import React, {useState} from "react";

import PropTypes from "prop-types";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import IconBase from "../../../../../common/icons/IconBase";
import { faSquare } from "@fortawesome/pro-solid-svg-icons";
import config from "./GitlabLeadTimeChartConfig";
import GitlabLeadTimeInsightsModal from "./GitlabLeadTimeInsightsModal";
import {getTimeDisplay} from "../../../charts-helpers";
function GitlabLeadTimeScatterPlotContainer({ chartData }) {

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const getScatterPlotsFromTimeStamp = (commit) => {
    const timestamp = commit["commitTimeStamp"];
    const hoursFraction = (timestamp.substr(11, 5).split(":")[1] / 60) * 100;

    return {
      x: new Date(timestamp),
      y: timestamp.substr(11, 2) + "." + hoursFraction,
      commitTimeStamp: new Date(timestamp).toLocaleString(),
      repositoryName: commit["repositoryName"],
      authorName: commit["authorName"],
      leadTime: getTimeDisplay(commit["leadTime"])[0],
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
      deployAverageLeadTime: getTimeDisplay(deployment?.deployAverageLeadTime)[0],
      deployCommitCount: deployment?.deployCommitCount,
      deployMedianTime:getTimeDisplay(deployment?.deployMedianTime)[0],
      stepId: deployment?.stepId,
      commits: deployment?.commits,
      branch: deployment?.branch
    };
  };
  const commitsData = [
    {
      id: "Commits Data",
      data: chartData.commits.map((item) =>
        getScatterPlotsFromTimeStamp(item),
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

  const onNodeSelect = (node) => {
      if(node?.data?.type === "deploy"){
          setShowModal(true);
          setModalData(node?.data?.commits || []);
      }
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

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
          onClick={(node) => onNodeSelect(node)}
          tooltip={({ node }) => {
            if (node?.data?.type === "deploy") {
              return (
                <div className={"p-1 bg-white border border-dark"} style={{zIndex: 1000}}>
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
                    Average Lead Time: <strong>{node?.data?.deployAverageLeadTime || "NA"}</strong>
                  </div>
                  <div className={"py-1"}>
                    Median Lead Time: <strong>{node?.data?.deployMedianTime || "NA"}</strong>
                  </div>
                  <div className={"py-1"}>
                    Commits: <strong>{node?.data?.deployCommitCount || "0"}</strong>
                  </div>
                  <div className={"py-1"}>
                    Branch: <strong>{node?.data?.branch || ""}</strong>
                  </div>
                </div>
              );
            }
            return (
              <div className={"p-1 bg-white border border-dark"} style={{zIndex: 1000}}>
                <div className={"py-1"}>
                  Repository: <strong>{node?.data?.repositoryName}</strong>
                </div>
                <div className={"py-1"}>
                  Title: <strong>{node?.data?.commitTitle}</strong>
                </div>
                <div className={"py-1"}>
                  Author: <strong>{node?.data?.authorName}</strong>
                </div>
                <div className={"py-1"}>
                  LeadTime: <strong>{node?.data?.leadTime}</strong>
                </div>
                <div className={"py-1"}>
                  CommitTime: <strong>{node?.data?.commitTimeStamp}</strong>
                </div>
              </div>
            );
          }}
          markers={markers}
        />
        <GitlabLeadTimeInsightsModal
          visible={showModal}
          data={modalData}
          onHide={onCloseModal}
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
