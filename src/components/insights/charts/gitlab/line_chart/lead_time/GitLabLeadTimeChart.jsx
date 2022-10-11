import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import chartsActions from "components/insights/charts/charts-actions";
import axios from "axios";
import GitlabLeadTimeHelpDocumentation from "../../../../../common/help/documentation/insights/charts/GitlabLeadTimeHelpDocumentation";
import GitlabLeadTimeScatterPlotContainer from "./GitlabLeadTimeScatterPlotContainer";
import GitlabLeadTimeDataBlock from "./GitlabLeadTimeDataBlock";
import {
  getDeploymentStageFromKpiConfiguration, getReverseTrend, getReverseTrendIcon,
} from "../../../charts-helpers";
import GitlabLeadTimeTrendDataBlock from "./GitlabLeadTimeTrendDataBlock";

function GitLabLeadTimeChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [meanCommitData, setMeanCommitData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
        ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
        ]?.value;

      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "gitlabLeadTimeForChange",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs,
      );
      const response2 =
        await chartsActions.parseConfigurationAndGetChartMetrics(
          getAccessToken,
          cancelSource,
          "gitlabAverageCommitTimeToMerge",
          kpiConfiguration,
          dashboardTags,
          null,
          null,
          dashboardOrgs,
        );

      const metrics = response?.data?.data[0]?.gitlabLeadTimeForChange?.data;
      const meanCommitTimeDataObject =
        response2?.data?.data[0]?.gitlabAverageCommitTimeToMerge?.data || {};

      if (
        isMounted?.current === true &&
        metrics?.statisticsData?.totalDeployments
      ) {
        setMetricData(metrics?.statisticsData);
        setChartData(metrics?.chartData);
        setMeanCommitData(meanCommitTimeDataObject);
      } else {
        setMetricData({});
        setChartData([]);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  // const loadDataPoints = async () => {
  //     const dataPoints = kpiConfiguration?.dataPoints;
  //     const dataPoint = dataPointHelpers.getDataPoint(
  //         dataPoints,
  //         constants.SUPPORTED_DATA_POINT_IDENTIFIERS
  //             .DEPLOYMENT_FREQUENCY_DATA_POINT,
  //     );
  //     setBuildFrequencyDataPoint(dataPoint);
  // };

  const getChartBody = () => {
    if (!metricData?.totalDeployments || !chartData?.commits?.length) {
      return null;
    }

    const recentStageDate = new Date(
      metricData?.lastDeploymentTime,
    ).toLocaleDateString();
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
    const dataBlockTextForDeployment = {
      current: selectedDeploymentStages
        ? "Total Deployments"
        : "Total Stages Run",
      previous: selectedDeploymentStages ? "Prev Deployments: " : "Prev Runs: ",
    };
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "450px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <Row
            xl={5}
            lg={5}
            md={5}
            className={"mb-2 d-flex justify-content-center"}
          >
            <Col
              md={12}
              className={"mx-2"}
            >
              <GitlabLeadTimeDataBlock
                value={`${selectedDeploymentStages}`}
                prevValue={""}
                topText={"Selected Stage(s)"}
                bottomText={""}
              />
            </Col>
            <Col md={12}>
              <GitlabLeadTimeTrendDataBlock
                value={metricData?.totalAverageLeadTime}
                prevValue={`${metricData?.previousTotalAverageLeadTime} Day(s)`}
                trend={getReverseTrend(
                  metricData?.totalAverageLeadTime,
                  metricData?.previousTotalAverageLeadTime,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Average Lead Time for Changes"}
                bottomText={"Prev LTFC: "}
              />
            </Col>
            <Col md={12}>
              <GitlabLeadTimeTrendDataBlock
                value={meanCommitData?.currentAvgCommitToMergeTime || "0"}
                prevValue={`${meanCommitData?.previousAvgCommitToMergeTime || "0"} Day(s)`}
                trend={getReverseTrend(
                  meanCommitData?.currentAvgCommitToMergeTime,
                  meanCommitData?.previousAvgCommitToMergeTime,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={`Average Merge Time`}
                bottomText={`Prev Merge Time: `}
              />
            </Col>
            <Col md={12}>
              <GitlabLeadTimeDataBlock
                value={metricData?.totalDeployments}
                prevValue={metricData?.previousTotalDeployments}
                topText={`${dataBlockTextForDeployment.current}`}
                bottomText={`${dataBlockTextForDeployment.previous}`}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={"mr-4"}>
                <b>Recent Stage:</b> {metricData?.lastDeploymentStage || "NA"}
                <div className="row" />
                <b>Date: </b>
                {recentStageDate}
              </div>
            </div>
          </Col>
          <Col className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabLeadTimeScatterPlotContainer chartData={chartData} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Gitlab Lead Time"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <GitlabLeadTimeHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
    </div>
  );
}

GitLabLeadTimeChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitLabLeadTimeChart;
