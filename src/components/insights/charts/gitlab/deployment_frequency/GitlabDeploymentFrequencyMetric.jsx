import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import {
  GITLAB_DEPLOYMENT_FREQUENCY_CONSTANTS as constants
} from "./GitlabDeploymentFrequencyConstants";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import GitlabDeployFrequencyChartHelpDocumentation from "../../../../common/help/documentation/insights/charts/GitlabDeployFrequencyChartHelpDocumentation";
import GitlabDeploymentFrequencyDataBlock from "./GitlabDeploymentFrequencyDataBlock";
import {
  getDeploymentStageFromKpiConfiguration,
  getMaturityColorClass, getMaturityScoreText,
  getTrend,
  getTrendIcon
} from "../../charts-helpers";
import GitlabDeploymentFrequencyLineChartContainer from "./GitlabDeploymentFrequencyLineChartContainer";
import GitlabDeploymentFrequencyTrendDataBlock from "./GitlabDeploymentFrequencyTrendDataBlock";
import gitlabAction from "../gitlab.action";
import BadgeBase from "../../../../common/badges/BadgeBase";
import GitlabDeploymentFrequencyMaturityBlock from "./GitlabDeploymentFrequencyMaturityBlock";
import FullScreenCenterOverlayContainer from "../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import GitlabDeploymentFrequencyMaturityScoreInsights from "./GitlabDeploymentFrequencyMaturityScoreInsights";

function GitlabDeploymentFrequency({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] =
    useState(undefined);
  const [chartData, setChartData] =
    useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [deploymentFrequencyDataPoint, setBuildFrequencyDataPoint] =
    useState(undefined);

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
  },[]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDataPoints(cancelSource);
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

      const response = await gitlabAction.gitlabDeploymentStatistics(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
      );
      const metrics = response?.data?.data?.gitlabDeploymentStatistics?.data;
      if (isMounted?.current === true && metrics?.statisticsData?.step?.total) {
        setMetricData(metrics?.statisticsData);
        setChartData(metrics?.chartData);
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

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const dataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS
        .DEPLOYMENT_FREQUENCY_DATA_POINT,
    );
    setBuildFrequencyDataPoint(dataPoint);
  };

 const closePanel = () => {
  toastContext.removeInlineMessage();
  toastContext.clearOverlayPanel();
};

const onRowSelect = () => {
  toastContext.showOverlayPanel(
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Deployment Maturity Score Statistics`}
      showToasts={true}
      titleIcon={faTable}
    >
      <div className={"p-3"}>
        <GitlabDeploymentFrequencyMaturityScoreInsights
          dashboardData={dashboardData}
          insightsData={metricData}
        />
      </div>
    </FullScreenCenterOverlayContainer>,
  );
};

  const getChartBody = () => {
    if (
      !metricData?.step?.total ||
      !chartData?.step?.length
    ) {
      return null;
    }
    const recentStageDate = new Date(metricData?.step?.stepFinishedAt).toLocaleDateString();
    const selectedDeploymentStages =
      getDeploymentStageFromKpiConfiguration(kpiConfiguration)?.length || 0;
    const dataBlockTextForDeployment = {
      current: selectedDeploymentStages ? "Total Deployments" : "Total Stages Run",
      previous: selectedDeploymentStages ? "Prev Deployments" : "Prev Runs",
    };
    const maturityScore = metricData?.step?.overallMaturityScoreText;
    const maturityColor = getMaturityColorClass(maturityScore);
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "500px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <GitlabDeploymentFrequencyMaturityBlock
            maturityScore={getMaturityScoreText(maturityScore)}
            maturityColor={maturityColor}
            iconOverlayBody={constants.MATURITY_TOOL_TIP[maturityScore]}
            onClick={onRowSelect}
          />
          <Row
            xl={4}
            lg={4}
            md={4}
            className={`mb-2 ml-3 py-2 d-flex justify-content-center maturity-border ${maturityColor}`}
          >
            <Col md={12}  className={"pl-2 pr-1"}>
              <GitlabDeploymentFrequencyDataBlock
                value={selectedDeploymentStages}
                prevValue={""}
                topText={"Selected Stage(s)"}
                bottomText={""}
              />
            </Col>
            <Col md={12} className={"px-1"}>
              <GitlabDeploymentFrequencyTrendDataBlock
                value={metricData?.step?.averageStepRuns}
                prevValue={
                  metricData?.step?.previousAverageStepRuns
                }
                dataPoint={deploymentFrequencyDataPoint}
                trend={getTrend(metricData?.step?.averageStepRuns,
                  metricData?.step?.previousAverageStepRuns)}
                getTrendIcon={getTrendIcon}
                topText={"Average Deployment Frequency"}
                bottomText={"Prev Average: "}
              />
            </Col>
            <Col md={12} className={"px-1"}>
              <GitlabDeploymentFrequencyDataBlock
                value={metricData?.pipeline?.totalSuccess}
                prevValue={
                  metricData?.pipeline?.previousTotalSuccess
                }
                topText={"Total Pipeline Runs"}
                bottomText={"Prev Runs: "}
              />
            </Col>
            <Col md={12} className={"pl-1 pr-2"}>
              <GitlabDeploymentFrequencyDataBlock
                value={metricData?.step?.totalSuccess}
                prevValue={
                  metricData?.step?.previousTotalSuccess
                }
                topText={`${dataBlockTextForDeployment.current}`}
                bottomText={`${dataBlockTextForDeployment.previous}: `}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={'mr-4'}>
                <b>Recent Deployed Stage:</b> {metricData?.step?.stepName || "NA"}
                <div className="row"/>
                <b>Deployed on:</b> {recentStageDate}
              </div>
            </div>
          </Col>
          <Col md={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabDeploymentFrequencyLineChartContainer
              chartData={chartData}
            />
          </Col>
          <Col md={12} className={"my-2 p-0"}>
            <BadgeBase className={"mx-2"} badgeText={"Note: Results fetched are based on UTC timezone of selected dates"} />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={"Deploy metrics"}
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
          <GitlabDeployFrequencyChartHelpDocumentation
            closeHelpPanel={closeHelpPanel}
          />
        )}
      />
    </div>
  );
}

GitlabDeploymentFrequency.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitlabDeploymentFrequency;
