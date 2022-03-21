import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import { defaultConfig } from "../../../../charts-views";
import chartConfig from "./SuccessExecutionsActionableInsightsChartConfig";
import {
  METRIC_CHART_STANDARD_HEIGHT,
  METRIC_THEME_CHART_PALETTE_COLORS
} from "../../../../../../common/helpers/metrics/metricTheme.helpers";
import {ResponsivePie} from "@nivo/pie";
import SuccessExecutionsActionableInsightsMetaData from "./SuccessExecutionsActionableInsightsMetaData";
import InsightsCardContainerBase from "../../../../../../common/card_containers/InsightsCardContainerBase";
import MetricBadgeBase from "../../../../../../common/badges/metric/MetricBadgeBase";
import TwoLineScoreDataBlock from "../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import AddNewCirclesGroup from "../../../../../../common/icons/create/AddNewCirclesGroup";
import chartsActions from "../../../../charts-actions";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import Model from "../../../../../../../core/data_model/model";
import TextFieldBase from "../../../../../../common/fields/text/TextFieldBase";

function SuccessExecutionsActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [topSuccessfulActions, setTopSuccessfulActions] = useState([]);
  const [topSuccessfulApplications, setTopSuccessfulApplications] = useState([]);
  const [topSuccessfulJobs, setTopSuccessfulJobs] = useState([]);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      const dashboardTags =
          dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "releaseTraceabilitySuccess",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs
      );
      const topActions = response?.data?.data[0]?.topSuccessfulActions;
      const topApplications = response?.data?.data[0]?.topSuccessfulApplications;
      const topJobs = response?.data?.data[0]?.topSuccessfulJobs;
      const actionableInsightsTableData = response?.data?.data[0]?.actionInsightsTraceabilityTable;
      //To remove following for loops once api is chnaged to send value param as expected.
      for(let i =0; i<=topActions.length - 1; i++){
        topActions[i].value = topActions[i].success_percentage;
      }
      for(let j =0; j<=topApplications.length - 1; j++){
        topApplications[j].value = topApplications[j].success_percentage;
      }
      for(let k =0; k<=topJobs.length - 1; k++){
        topJobs[k].value = topJobs[k].success_percentage;
      }
      setTopSuccessfulActions(topActions);
      setTopSuccessfulApplications(topApplications);
      setTopSuccessfulJobs(topJobs);
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
    return (
      <>
        {getDateRange()}
        {getSuccessExecutionsSummaryCharts()}
        {getSuccessExecutionsInsightTable()}
      </>
    );
  };

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const getSuccessExecutionsSummaryCharts = () => {
    return (
      <Row className="pb-3 px-2 my-5">
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopSuccessfulApplicationsPieChart()}
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopSuccessfulActionsPieChart()}
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          {getTopSuccessfulJobsPieChart()}
        </Col>
      </Row>
    );
  };

  const getTopSuccessfulApplicationsPieChart = () => {
    if(!topSuccessfulApplications || topSuccessfulApplications.length === 0) {
      return null;
    }
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        <ResponsivePie
          data={topSuccessfulApplications}
          {...defaultConfig()}
          {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
        />
        <div style={{textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Applications
        </div>
      </div>
    );
  };

  const getTopSuccessfulActionsPieChart = () => {
    if(!topSuccessfulActions || topSuccessfulActions.length === 0) {
      return null;
    }
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        <ResponsivePie
          data={topSuccessfulActions}
          {...defaultConfig()}
          {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
        />
        <div style={{textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Actions
        </div>
      </div>
    );
  };

  const getTopSuccessfulJobsPieChart = () => {
    if(!topSuccessfulJobs || topSuccessfulJobs.length === 0) {
      return null;
    }
    return (
      <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
        <ResponsivePie
          data={topSuccessfulJobs}
          {...defaultConfig()}
          {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
        />
        <div style={{textAlign: 'center', marginLeft: '3rem'}}>
          Top Five Jobs
        </div>
      </div>
    );
  };

  const getSuccessExecutionsInsightTable = () => {
    if(!actionInsightsTraceabilityTable || actionInsightsTraceabilityTable.length === 0) {
      return null;
    }
    const actionableInsightsTable = [];
    for (var i = 0; i <= actionInsightsTraceabilityTable.length - 1; i++) {
      const actionInsightsTraceabilityTableDto = new Model({...actionInsightsTraceabilityTable[i]}, SuccessExecutionsActionableInsightsMetaData, false);
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

SuccessExecutionsActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SuccessExecutionsActionableInsights;
