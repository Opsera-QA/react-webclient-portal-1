import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityMetricContainer from "components/common/panels/insights/charts/VanityMetricContainer";
import axios from "axios";
import { JIRA_CHANGE_FAILURE_RATE_CONSTANTS as constants } from "./JiraChangeFailureRateConstants";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import jiraAction from "../../jira.action";
import {
  getMaturityColorClass,
  getMaturityScoreText,
  getResultFromKpiConfiguration,
  getReverseTrend,
  getReverseTrendIcon,
} from "../../../charts-helpers";
import JiraChangeFailureRateHelpDocumentation from "../../../../../common/help/documentation/insights/charts/JiraChangeFailureRateHelpDocumentation";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import JiraChangeFailureRateMaturityBlock from "./JiraChangeFailureRateMaturityBlock";
import JiraChangeFailureRateDataBlock from "./JiraChangeFailureRateDataBlock";
import JiraChangeFailureRateTrendDataBlock from "./JiraChangeFailureRateTrendDataBlock";
import JiraChangeFailureRateLineChartContainer from "./JiraChangeFailureRateLineChartContainer";
import FullScreenCenterOverlayContainer from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "../../../../../../contexts/DialogToastContext";
import JiraChangeFailureRateMaturityScoreInsights from "./JiraChangeFailureRateMaturityScoreInsights";
import _ from "lodash";
import InfoDialog from "../../../../../common/status_notifications/info";
function JiraChangeFailureRate({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] = useState(undefined);
  const [chartData, setChartData] = useState(undefined);
  const [prevChartData, setPrevChartData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [goalsData, setGoalsData] = useState(undefined);
  const [changeFailureRateDataPoint, setChangeFailureRateDataPoint] =
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
  }, []);

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
      const jiraResolutionNames = getResultFromKpiConfiguration(
        kpiConfiguration,
        "jira-resolution-names",
      );
      const jiraExcludedResolutionNames = getResultFromKpiConfiguration(
        kpiConfiguration,
        "jira-excluded-resolution-names",
      );
      let response;
      if (jiraResolutionNames?.length) {
        response = await jiraAction.getJiraChangeFailureRate(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames,
          jiraExcludedResolutionNames,
        );
        const metrics = response?.data?.data?.jiraChangeFailureRate?.data;
        if (isMounted?.current === true && Array.isArray(metrics?.chartData)) {
          setMetricData(metrics);
          setChartData(metrics?.chartData);
          setPrevChartData(metrics?.previousData?.chartData);
        }
      } else {
        // This is required when there is no changeType selected but still need the chart to show no data
        setChartData([]);
        setMetricData({ changeFailureRate: "0", prevChangeFailureRate: "NA" });
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
      constants.SUPPORTED_DATA_POINT_IDENTIFIERS.CHANGE_FAILURE_RATE_DATA_POINT,
    );
    setChangeFailureRateDataPoint(dataPoint);
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getMedian = (data, data2) => {
    let vals = [];
    let median = '';
    for( const obj in data){
      vals.push(Number(data[obj].y));
    }
    vals.sort(function(a,b){
      return a-b;
    });

    const half = Math.floor(vals.length / 2);
    if (half.length % 2) {
      median= vals[half].toFixed(2);
    }
    else{
      median= ((vals[half - 1] + vals[half]) / 2.0).toFixed(2);
    }
    if(median == 0){
      return median;
    }
    else {
      return ((median/data2)/100).toFixed(2);
    }
  };

  const onRowSelect = () => {
    toastContext.showOverlayPanel(
      <FullScreenCenterOverlayContainer
        closePanel={closePanel}
        showPanel={true}
        titleText={`Jira Change Failure Rate Maturity Score Statistics`}
        showToasts={true}
        titleIcon={faTable}
      >
        <div className={"p-3"}>
          <JiraChangeFailureRateMaturityScoreInsights
            kpiConfiguration={kpiConfiguration}
            insightsData={metricData}
          />
        </div>
      </FullScreenCenterOverlayContainer>,
    );
  };

  const getChartBody = () => {
    const jiraResolutionNames =
      getResultFromKpiConfiguration(kpiConfiguration, "jira-resolution-names")?.length || 0;
    if (!jiraResolutionNames) {
      return (
          <div className="new-chart mb-3" style={{ height: "300px" }}>
            <div className="max-content-width p-5 mt-5"
                 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InfoDialog message="No Failure Status Applied. Please select a Change Failure Status(Resolution Name) on filters to proceed further." />
            </div>
          </div>
      );
    }

    if (
      !metricData ||
      !Array.isArray(chartData) ||
      !metricData.changeFailureRate ||
      !metricData.total
    ) {
      return null;
    }
    const maturityScore = metricData?.overallMaturityScoreText;
    const maturityColor = getMaturityColorClass(maturityScore);
    const changeFailureRate = metricData?.changeFailureRate;
    const changeFailureRateDisplay = !isNaN(changeFailureRate)
      ? changeFailureRate + ` %`
      : "NA";
    const prevChangeFailureRateDisplay = !isNaN(
      metricData?.prevChangeFailureRate,
    )
      ? metricData?.prevChangeFailureRate + ` %`
      : "NA";
    return (
      <div
        className="new-chart m-3 p-0"
        style={{ minHeight: "500px", display: "flex" }}
      >
        <Row className={"w-100"}>
          <JiraChangeFailureRateMaturityBlock
            maturityScore={getMaturityScoreText(maturityScore)}
            maturityColor={maturityColor}
            iconOverlayBody={constants.MATURITY_TOOL_TIP[maturityScore]}
            onClick={onRowSelect}
          />
          <Row
            xl={4}
            lg={4}
            md={4}
            className={`mb-2 ml-3 py-2 d-flex justify-content-center ${maturityColor}`}
          >
            <Col
              md={12}
              className={"pl-2 pr-1"}
            >
              <JiraChangeFailureRateDataBlock
                value={jiraResolutionNames}
                prevValue={""}
                topText={"Selected Failure Status"}
                bottomText={""}
              />
            </Col>
            <Col
              md={12}
              className={"px-1"}
            >
              <JiraChangeFailureRateTrendDataBlock
                value={changeFailureRateDisplay}
                prevValue={prevChangeFailureRateDisplay}
                trend={getReverseTrend(
                  changeFailureRate,
                  metricData?.prevChangeFailureRate,
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Change Failure Rate"}
                bottomText={"Prev CFR: "}
                dataPoint={changeFailureRateDataPoint}
                dataPointValue={changeFailureRate}
              />
            </Col>
            <Col
              md={12}
              className={"px-1"}
            >
              <JiraChangeFailureRateTrendDataBlock
                  value={getMedian(chartData, metricData?.total)}
                  prevValue={getMedian(prevChartData, metricData?.prevTotal) + "%"}
                  trend={getReverseTrend(
                      getMedian(chartData),
                      getMedian(prevChartData),
                  )}
                  getTrendIcon={getReverseTrendIcon}
                  topText={"Median Change Failure Rate"}
                  bottomText={"Prev Median: "}
              />
            </Col>
            <Col
              md={12}
              className={"pl-1 pr-2"}
            >
              <JiraChangeFailureRateDataBlock
                value={metricData?.totalFailure}
                prevValue={metricData?.prevTotalFailure}
                topText={`Changes Failed`}
                bottomText={`Prev Changes Failed: `}
              />
            </Col>
          </Row>
          <Col md={12}>
            <div className={"d-flex md-2"}>
              <div className={"mr-4"}>
                <b>Total Changes:</b> {metricData?.total}
              </div>
            </div>
          </Col>
          <Col
            md={12}
            className={"my-2 p-0 d-flex flex-column align-items-end"}
          >
            <JiraChangeFailureRateLineChartContainer chartData={chartData} />
          </Col>
          <Col
            md={12}
            className={"my-2 p-0"}
          >
            <BadgeBase
              className={"mx-2"}
              badgeText={
                "Note: Results fetched are based on UTC timezone of selected dates"
              }
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <VanityMetricContainer
        title={kpiConfiguration?.kpi_name}
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
          <JiraChangeFailureRateHelpDocumentation
            closeHelpPanel={closeHelpPanel}
          />
        )}
      />
    </div>
  );
}

JiraChangeFailureRate.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default JiraChangeFailureRate;
