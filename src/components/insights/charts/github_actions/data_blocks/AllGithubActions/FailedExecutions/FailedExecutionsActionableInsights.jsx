import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import chartConfig from "./FailedExecutionsActioanbleInsightsChartConfig";
import FailedExecutionsActionableInsightsMetaData from "./FailedExecutionsActionableInsightsMetaData";
import { defaultConfig } from "../../../../charts-views";
import {
  METRIC_CHART_STANDARD_HEIGHT,
  METRIC_THEME_CHART_PALETTE_COLORS
} from "../../../../../../common/helpers/metrics/metricTheme.helpers";
import {ResponsivePie} from "@nivo/pie";
import AddNewCirclesGroup from "../../../../../../common/icons/create/AddNewCirclesGroup";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import chartsActions from "../../../../charts-actions";
import Model from "../../../../../../../core/data_model/model";
import InsightsCardContainerBase from "../../../../../../common/card_containers/InsightsCardContainerBase";
import MetricBadgeBase from "../../../../../../common/badges/metric/MetricBadgeBase";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import TextFieldBase from "../../../../../../common/fields/text/TextFieldBase";
import LoadingIcon from "../../../../../../common/icons/LoadingIcon";

function FailedExecutionsActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [topFailedActions, setTopFailedActions] = useState([]);
  const [topFailedApplications, setTopFailedApplications] = useState([]);
  const [topFailedJobs, setTopFailedJobs] = useState([]);
  const [actionInsightsTraceabilityTable, setActionInsightsTraceabilityTable] = useState([]);

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

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardFilters =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "amexFilters")]
          ?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "releaseTraceabilityFailure",
        kpiConfiguration,
        dashboardTags,
        null,
        dashboardFilters,
        dashboardOrgs
      );
      const topActions = response?.data?.data[0]?.topFailureActions;
      const topApplications = response?.data?.data[0]?.topFailureApplications;
      const topJobs = response?.data?.data[0]?.topFailureJobs;
      const actionableInsightsTableData = response?.data?.data[0]?.actionInsightsTraceabilityTable;
      //To remove following for loops once api is chnaged to send value param as expected.
      for(let i =0; i<=topActions.length - 1; i++){
        topActions[i].value = 0;
      }
      for(let j =0; j<=topApplications.length - 1; j++){
        topApplications[j].value = topApplications[j].failure_percentage;
      }
      for(let k =0; k<=topJobs.length - 1; k++){
        topJobs[k].value = topJobs[k].failure_percentage;
      }
      setTopFailedActions(topActions);
      setTopFailedApplications(topApplications);
      setTopFailedJobs(topJobs);
      setActionInsightsTraceabilityTable(actionableInsightsTableData);
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

  const getBody = () => {
    if(isLoading) {
      return <div className={"m-3"}><LoadingIcon className={"mr-2 my-auto"} />Loading</div>;
    }
    return (
      <>
        {getDateRange()}
        {getFailedPercentSummaryCharts()}
        {getFailedExecutionsInsightTable()}
      </>
    );
  };

  const getFailedPercentSummaryCharts = () => {
    return (
      <Row className="pb-3 px-2 my-5">
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopFailureApplicationsPieChart()}
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopFailureActionsPieChart()}
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopFailureJobsPieChart()}
        </Col>
      </Row>
    );
  };

  const getTopFailureApplicationsPieChart = () => {
    if(!topFailedApplications || topFailedApplications.length === 0) {
      return null;
    }
    let noFailure = true;
    topFailedApplications.forEach((element) => {
      if(element.value > 0) {
        noFailure = false;
      }
    });
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        {noFailure ?
          <div className={'light-gray-text-secondary metric-block-footer-text'} style={{textAlign:'center', height: METRIC_CHART_STANDARD_HEIGHT, paddingTop: '8rem'}}>
            No failed applications found.
          </div>
          :
          <ResponsivePie
            data={topFailedApplications}
            {...defaultConfig()}
            {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
          />
        }
        <div style={noFailure ? {textAlign: 'center'} : {textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Applications
        </div>
      </div>
    );
  };

  const getTopFailureActionsPieChart = () => {
    if(!topFailedActions || topFailedActions.length === 0) {
      return null;
    }
    let noFailure = true;
    topFailedActions.forEach((element) => {
      if(element.value > 0) {
        noFailure = false;
      }
    });
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        {noFailure ?
            <div className={'light-gray-text-secondary metric-block-footer-text'} style={{textAlign:'center', height: METRIC_CHART_STANDARD_HEIGHT, paddingTop: '8rem'}}>
              No failed actions found.
            </div>
          :
          <ResponsivePie
            data={noFailure ? [] : topFailedActions}
            {...defaultConfig()}
            {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)} />
         }
        <div style={noFailure ? {textAlign: 'center'} : {textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Actions
        </div>
      </div>
    );
  };

  const getTopFailureJobsPieChart = () => {
    if(!topFailedJobs || topFailedJobs.length === 0) {
      return null;
    }
    let noFailure = true;
    topFailedJobs.forEach((element) => {
      if(element.value > 0) {
        noFailure = false;
      }
    });
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        {noFailure ?
          <div className={'light-gray-text-secondary metric-block-footer-text'} style={{textAlign:'center', height: METRIC_CHART_STANDARD_HEIGHT, paddingTop: '8rem'}}>
            No failed jobs found.
          </div>
          :
          <ResponsivePie
            data={topFailedJobs}
            {...defaultConfig()}
            {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
          />
        }
        <div style={noFailure ? {textAlign: 'center'} : {textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Applications
        </div>
      </div>
    );
  };

  const getFailedExecutionsInsightTable = () => {
    if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
      return null;
    }
    const actionableInsightsTable = [];
    for (var i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
      const actionInsightsData = actionInsightsTraceabilityTable[i];
      const actionDurationInMins = actionInsightsData.actionDurationInMins;
      actionInsightsData.actionDurationInMins = actionDurationInMins + ' Mins';
      const successPercentage = actionInsightsData.successPercentage;
      actionInsightsData.successPercentage = successPercentage + '%';
      const actionInsightsTraceabilityTableDto = new Model({...actionInsightsData}, FailedExecutionsActionableInsightsMetaData, false);
      const runTrendData = actionInsightsTraceabilityTable[i]?.runTrend;
      const trendData = [];
      for(let i = 0;i<=runTrendData.length - 1; i++) {
        if(runTrendData[i] === "success") {
          trendData.push({color: 'green'});
        } else if(runTrendData[i] === "failure") {
          trendData.push({color: 'red'});
        }
      }
      actionableInsightsTable.push(
        <InsightsCardContainerBase titleBar={getTitleBar(i)}>
          <div className="m-2">
            <div className={"d-flex"}>
              <MetricBadgeBase
                className={"mr-3"}
                badgeText={`Application Name: ${actionInsightsTraceabilityTable?.[i]?.applicationName}`}
              />
              <MetricBadgeBase
                className={"mr-3"}
                badgeText={`Repository Name: ${actionInsightsTraceabilityTable?.[i]?.repositoryName}`}
              />
            </div>
            <Row className="d-flex align-items-center">
              <Col lg={12} className={"px-0"}>
                <Row className={'d-flex align-items-center'}>
                  <Col sm={12} md={5} lg={3}>
                    <TwoLineScoreDataBlock
                      className="p-3"
                      score={actionInsightsTraceabilityTable?.[i]?.numberOfCommits}
                      subtitle={"Total Commits"}
                    />
                  </Col>
                  <Col sm={12} md={7} lg={9}>
                    <Row>
                      <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={actionInsightsTraceabilityTableDto} fieldName={"actionDurationInMins"} className="insight-detail-label my-2" />
                      </Col>
                      <Col sm={12} md={6} lg={6}>
                        <div className={"my-2"}>
                          <label className="mb-0 mr-2 text-muted">
                            <span>
                              Trend: <AddNewCirclesGroup data={trendData}/>
                            </span>
                          </label>
                        </div>
                      </Col>
                      <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={actionInsightsTraceabilityTableDto} fieldName={"actionRunNumber"} className="insight-detail-label my-2" />
                      </Col>
                      <Col sm={12} md={6} lg={6}>
                        <TextFieldBase dataObject={actionInsightsTraceabilityTableDto} fieldName={"successPercentage"} className="insight-detail-label my-2" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </InsightsCardContainerBase>
      );
    }
    return (
      <div>
        {actionableInsightsTable}
      </div>
    );
  };

  const getTitleBar = (currentElementIndex) => {
    return (
      <div className="d-flex justify-content-between w-100">
        <div>{actionInsightsTraceabilityTable?.[currentElementIndex]?.actionName}</div>
      </div>
    );
  };

  return <>{getBody()}</>;
}

FailedExecutionsActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default FailedExecutionsActionableInsights;
