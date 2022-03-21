import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import {adjustBarWidth, defaultConfig, getColorByData} from "../../../../charts-views";
import barConfig from "./SuccessPercentActionableInsightsBarConfig";
import chartConfig from "./SuccessPercentActionableInsightsChartConfig";
import {
  METRIC_CHART_STANDARD_HEIGHT,
  METRIC_THEME_CHART_PALETTE_COLORS
} from "../../../../../../common/helpers/metrics/metricTheme.helpers";
import {ResponsivePie} from "@nivo/pie";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import MetricContentDataBlockBase from "../../../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import {ResponsiveBar} from "@nivo/bar";
import {AuthContext} from "../../../../../../../contexts/AuthContext";
import chartsActions from "../../../../charts-actions";

function SuccessPercentActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [topSuccessfulActions, setTopSuccessfulActions] = useState([]);
  const [topSuccessfulApplications, setTopSuccessfulApplications] = useState([]);
  const [topSuccessfulJobs, setTopSuccessfulJobs] = useState([]);

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

  const barData = [
    {
      AuthorName: "abc",
      success: 30,
      _id: "Success"
    },
    {
      AuthorName: "cde",
      cancelled: 50,
      _id: "Cancelled"
    },
    {
      AuthorName: "efg",
      failed: 45,
      _id: "Failed"
    },
    {
      AuthorName: "mno",
      skipped: 25,
      _id: "Skipped"
    }
  ];

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
        {getSuccessPercentSummaryCharts()}
        {getSuccessPercentSummaryTextBoxes()}
      </>
    );
  };

  const getSuccessPercentSummaryCharts = () => {
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

  const getSuccessPercentSummaryTextBoxes = () => {
    if(!topSuccessfulActions || topSuccessfulActions.length === 0) {
      return null;
    }
    var successPercentSummary = [];
    for (var i = 0; i <= topSuccessfulActions.length - 1; i++) {
      successPercentSummary.push(
        <Col md={6} className={'mb-2'}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={topSuccessfulActions[i].actionName}
              content={
                <div style={{display: "grid"}}>
                  <span>Application Name: {topSuccessfulActions[i].applicationName}</span>
                  <Row className="pb-3 px-2 my-5">
                    <Col xl={12} lg={12} md={12} className={"my-1"} style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
                      <ResponsiveBar
                        data={barData}
                        {...defaultConfig("Percentage", "", false, false, "", "")}
                        {...barConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
                        {...adjustBarWidth(barData)}
                      />
                    </Col>
                  </Row>
                </div>
              }
            />
          </DataBlockBoxContainer>
        </Col>
      );
    }
    return (
      <div>
        <Row className="pb-3 px-2 my-5">
          {successPercentSummary}
        </Row>
      </div>
    );
  };

  return <>{getBody()}</>;
}

SuccessPercentActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SuccessPercentActionableInsights;
