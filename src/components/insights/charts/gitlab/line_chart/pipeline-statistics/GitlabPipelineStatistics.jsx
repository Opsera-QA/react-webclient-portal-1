import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import { GITLAB_PIPELINE_STATISTICS_CONSTANTS as constants } from "./GitlabPipelineStatistics_kpi_datapoint_identifiers";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import GitlabPipelineStatisticsLineChartContainer from "./GitlabPipelineStatisticsLineChartContainer";
import GitlabPipelineStatisticsTrendDataBlock from "./GitlabPipelineStatisticsTrendDataBlock";
import {getReverseTrend, getReverseTrendIcon, getTrend, getTrendIcon} from "../../../charts-helpers";
import gitlabAction from "../../gitlab.action";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import GitlabPipelineStatisticsActionableInsightsTable from "./GitlabPipelineStatisticsActionableInsightsTable";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import BadgeBase from "../../../../../common/badges/BadgeBase";

function GitlabPipelineStatistics({
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
  const [pipelineStatsDataPoint, setPipelineStatsDataPoint] = useState(undefined);
  const [failurePercentDataPoint, setFailurePercentDataPoint] = useState(undefined);
  const [skippedPercentDataPoint, setSkippedPercentDataPoint] = useState(undefined);
  const [cancelledPercentDataPoint, setCancelledPercentDataPoint] = useState(undefined);

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

      const response = await gitlabAction.gitlabPipelineData(
        getAccessToken,
        cancelSource,
        kpiConfiguration,
        dashboardTags,
        dashboardOrgs,
      );
      const metrics = response?.data?.data?.gitlabPipelineData?.data;
      if (isMounted?.current === true && metrics?.statisticsData?.pipeline?.total) {
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
          .PIPELINE_STATISTICS_DATA_POINT,
    );
    setPipelineStatsDataPoint(dataPoint);
    setFailurePercentDataPoint(dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.FAILURE_PERCENT_DATA_POINT,
    ));
    setSkippedPercentDataPoint(dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.SKIPPED_PERCENT_DATA_POINT,
    ));
    setCancelledPercentDataPoint(dataPointHelpers.getDataPoint(
      dataPoints,
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.CANCELLED_PERCENT_DATA_POINT,
    ));
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const onRowSelect = (activeTab) => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Gitlab Pipeline Statistics`}
        showToasts={true}
        titleIcon={faTable}
        isLoading={false}
      >
        <div className={"p-3"}>
          <GitlabPipelineStatisticsActionableInsightsTable
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            insightsData={metricData}
            activeTab={activeTab}
          />
        </div>
      </FullScreenCenterOverlayContainer>
    );
  };

  const getChartBody = () => {
    if (
      !metricData?.pipeline?.total ||
      !chartData?.success?.length) {
      return null;
    }
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
              <GitlabPipelineStatisticsTrendDataBlock
                onClick ={() => onRowSelect('success')}
                value={metricData?.pipeline?.successPercentage}
                prevValue={
                  metricData?.pipeline?.previousSuccessPercentage
                }
                dataPoint={pipelineStatsDataPoint}
                trend={getTrend(metricData?.pipeline?.successPercentage,
                    metricData?.pipeline?.previousSuccessPercentage)}
                getTrendIcon={getTrendIcon}
                topText={"Success"}
                bottomText={"Prev: "}
                dataPointValue={metricData?.pipeline?.successPercentage}
              />
            </Col>
            <Col md={12}>
              <GitlabPipelineStatisticsTrendDataBlock
                onClick ={() => onRowSelect('failed')}
                value={metricData?.pipeline?.failedPercentage}
                prevValue={
                  metricData?.pipeline?.previousFailedPercentage
                }
                trend={getReverseTrend(metricData?.pipeline?.failedPercentage,
                  metricData?.pipeline?.previousFailedPercentage)}
                getTrendIcon={getReverseTrendIcon}
                topText={"Failure"}
                bottomText={"Prev: "}
                dataPoint={failurePercentDataPoint}
                dataPointValue={metricData?.pipeline?.failedPercentage}
              />
            </Col>
            <Col md={12}>
              <GitlabPipelineStatisticsTrendDataBlock
                onClick ={() => onRowSelect('skipped')}
                value={metricData?.pipeline?.skippedPercentage}
                prevValue={
                  metricData?.pipeline?.previousSkippedPercentage
                }
                trend={getReverseTrend(metricData?.pipeline?.skippedPercentage,
                    metricData?.pipeline?.previousSkippedPercentage)}
                getTrendIcon={getReverseTrendIcon}
                topText={"Skipped"}
                bottomText={"Prev: "}
                dataPoint={skippedPercentDataPoint}
                dataPointValue={metricData?.pipeline?.skippedPercentage}
              />
            </Col>
            <Col md={12}>
              <GitlabPipelineStatisticsTrendDataBlock
                onClick ={() => onRowSelect('cancelled')}
                value={metricData?.pipeline?.cancelledPercentage}
                prevValue={
                  metricData?.pipeline?.previousCancelledPercentage
                }
                trend={getReverseTrend(metricData?.pipeline?.cancelledPercentage,
                  metricData?.pipeline?.previousCancelledPercentage)}
                getTrendIcon={getReverseTrendIcon}
                topText={`Cancelled`}
                bottomText={'Prev: '}
                dataPoint={cancelledPercentDataPoint}
                dataPointValue={metricData?.pipeline?.cancelledPercentage}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={'mr-4'}>
                <b>Total Pipelines:</b> {metricData?.pipeline?.total || "NA"}
              </div>
            </div>
          </Col>
          <Col md={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
            <GitlabPipelineStatisticsLineChartContainer
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
        title={"Pipeline metrics"}
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        chart={getChartBody()}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        isBeta={true}
        // chartHelpComponent={(closeHelpPanel) => (
        //   <GitlabDeployFrequencyChartHelpDocumentation
        //     closeHelpPanel={closeHelpPanel}
        //   />
        // )}
      />
    </div>
  );
}

GitlabPipelineStatistics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default GitlabPipelineStatistics;
