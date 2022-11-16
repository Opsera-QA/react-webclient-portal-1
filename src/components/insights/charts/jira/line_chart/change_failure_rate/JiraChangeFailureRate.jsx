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
  getReverseTrendIcon
} from "../../../charts-helpers";
import JiraChangeFailureRateHelpDocumentation
  from "../../../../../common/help/documentation/insights/charts/JiraChangeFailureRateHelpDocumentation";
import BadgeBase from "../../../../../common/badges/BadgeBase";
import GitlabLeadTimeMaturityBlock from "../../../gitlab/line_chart/lead_time/GitlabLeadTimeMaturityBlock";
import GitlabLeadTimeDataBlock from "../../../gitlab/line_chart/lead_time/GitlabLeadTimeDataBlock";
import GitlabLeadTimeTrendDataBlock from "../../../gitlab/line_chart/lead_time/GitlabLeadTimeTrendDataBlock";
import GitlabLeadTimeScatterPlotContainer
  from "../../../gitlab/line_chart/lead_time/GitlabLeadTimeScatterPlotContainer";
import JiraChangeFailureRateMaturityBlock from "./JiraChangeFailureRateMaturityBlock";
import JiraChangeFailureRateDataBlock from "./JiraChangeFailureRateDataBlock";
import JiraChangeFailureRateTrendDataBlock from "./JiraChangeFailureRateTrendDataBlock";
import JiraChangeFailureRateLineChartContainer from "./JiraChangeFailureRateLineChartContainer";

const DEFAULT_GOALS = {
  change_failure_rate: 10,
};

function JiraChangeFailureRate({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metricData, setMetricData] =
    useState(undefined);
  const [chartData, setChartData] =
    useState(undefined);
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
      let goals =
        kpiConfiguration?.dataPoints[0]?.strategic_criteria?.data_point_evaluation_rules?.success_rule?.primary_trigger_value;
      if (goals) {
        setGoalsData({change_failure_rate: goals});
      } else {
        setGoalsData(DEFAULT_GOALS);
      }
      const jiraResolutionNames = getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names');
      let response;
      if(jiraResolutionNames?.length){
        response = await jiraAction.getJiraChangeFailureRate(
          getAccessToken,
          cancelSource,
          kpiConfiguration,
          dashboardTags,
          dashboardOrgs,
          jiraResolutionNames
        );
        const metrics = response?.data?.data?.jiraChangeFailureRate?.data;
        if (isMounted?.current === true && Array.isArray(metrics?.chartData)) {
          setMetricData(metrics);
          setChartData(metrics?.chartData);
        }
      } else {
        // This is required when there is no changeType selected but still need the chart to show no data
        setChartData([]);
        setMetricData({changeFailureRate:"0", prevChangeFailureRate:"NA"});
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
            .CHANGE_FAILURE_RATE_DATA_POINT,
    );
    setChangeFailureRateDataPoint(dataPoint);
  };

  const getChartBody = () => {
    if (!metricData || !Array.isArray(chartData) || !metricData.changeFailureRate) {
      return null;
    }
    const jiraResolutionNames =
        getResultFromKpiConfiguration(kpiConfiguration, 'jira-resolution-names')?.length || 0;
    const maturityScore = metricData?.maturityScore;
    const maturityColor = getMaturityColorClass(maturityScore);
    const changeFailureRate = !isNaN(metricData?.changeFailureRate) ? metricData?.changeFailureRate +` %` :'NA';
    const prevChangeFailureRate = !isNaN(metricData?.prevChangeFailureRate) ? metricData?.prevChangeFailureRate +` %` :'NA';

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
        />
        <Row
            xl={4}
            lg={4}
            md={4}
            className={`mb-2 ml-3 py-2 d-flex justify-content-center maturity-border ${maturityColor}`}
        >
          {/*This would get removed when average merge time is fixed*/}
          <Col md={12}>
            <JiraChangeFailureRateDataBlock
                value={jiraResolutionNames}
                prevValue={""}
                topText={"Selected Failure Status"}
                bottomText={""}
            />
          </Col>
          <Col md={12} className={"pl-2 pr-1"}>
            <JiraChangeFailureRateTrendDataBlock
                value={changeFailureRate}
                prevValue={prevChangeFailureRate}
                trend={getReverseTrend(
                  changeFailureRate,
                  prevChangeFailureRate
                )}
                getTrendIcon={getReverseTrendIcon}
                topText={"Change Failure Rate"}
                bottomText={"Prev CFR: "}
                dataPoint={changeFailureRateDataPoint}
            />
          </Col>
          <Col md={12} className={"px-2"}>
            <JiraChangeFailureRateDataBlock
                value={metricData?.total}
                prevValue={metricData?.prevTotal}
                topText={`Total Changes`}
                bottomText={`Prev Total Changes: `}
            />
          </Col>
          <Col md={12}>
            <JiraChangeFailureRateDataBlock
              value={metricData?.totalFailure}
              prevValue={metricData?.prevTotalFailure}
              topText={`Changes Failed`}
              bottomText={`Prev Changes Failed: `}
            />
          </Col>
        </Row>
        <Col md={12} className={"my-2 p-0 d-flex flex-column align-items-end"}>
          <JiraChangeFailureRateLineChartContainer
            chartData={chartData}
            goalsData={goalsData?.change_failure_rate}
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
