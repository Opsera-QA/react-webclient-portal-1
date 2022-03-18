import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { getMetricFilterValue } from "components/common/helpers/metrics/metricFilter.helpers";
import MetricDateRangeBadge from "components/common/badges/date/metrics/MetricDateRangeBadge";
import {adjustBarWidth, defaultConfig} from "../../../../charts-views";
import chartConfig from "./FailedExecutionsActioanbleInsightsChartConfig";
import {
  METRIC_CHART_STANDARD_HEIGHT,
  METRIC_THEME_CHART_PALETTE_COLORS
} from "../../../../../../common/helpers/metrics/metricTheme.helpers";
import {ResponsivePie} from "@nivo/pie";
import DataBlockBoxContainer from "../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import MetricContentDataBlockBase from "../../../../../../common/metrics/data_blocks/MetricContentDataBlockBase";
import {ResponsiveBar} from "@nivo/bar";

function FailedExecutionsActionableInsights({ kpiConfiguration, dashboardData }) {
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const getDateRange = () => {
    const date = getMetricFilterValue(kpiConfiguration?.filters, "date");
    return <MetricDateRangeBadge startDate={date?.startDate} endDate={date?.endDate} />;
  };

  const data = [
    {
      color: "#5B5851",
      id: "Test1",
      value: 60,
    },
    {
      color: "#7A756C",
      id: "Test2",
      value: 30,
    },
    {
      color: "#7A756C",
      id: "Test3",
      value: 10,
    }
  ];

  const getBody = () => {
    return (
      <>
        {getDateRange()}
        {getFailedPercentSummaryCharts()}
        {getFailedPercentSummaryTextBoxes()}
      </>
    );
  };

  const getFailedPercentSummaryCharts = () => {
    return (
      <Row className="pb-3 px-2 my-5">
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
            <ResponsivePie
              data={data}
              {...defaultConfig()}
              {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
            />
            <div style={{textAlign: 'center', marginLeft: '3rem'}}>
              Applications
            </div>
            <div style={{textAlign: 'center', marginLeft: '3rem'}} className={'font-inter-light-300 light-gray-text-secondary metric-block-footer-text'}>
              *Top 5
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
            <ResponsivePie
              data={data}
              {...defaultConfig()}
              {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
            />
            <div style={{textAlign: 'center', marginLeft: '3rem'}}>
              Actions
            </div>
            <div style={{textAlign: 'center', marginLeft: '3rem'}} className={'font-inter-light-300 light-gray-text-secondary metric-block-footer-text'}>
              *Top 5
            </div>
          </div>
        </Col>
        <Col xl={4} lg={4} md={4} className={"my-1"}>
          <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
            <ResponsivePie
              data={data}
              {...defaultConfig()}
              {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
            />
            <div style={{textAlign: 'center', marginLeft: '3rem'}}>
              Jobs
            </div>
            <div style={{textAlign: 'center', marginLeft: '3rem'}} className={'font-inter-light-300 light-gray-text-secondary metric-block-footer-text'}>
              *Top 5
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  const getFailedPercentSummaryTextBoxes = () => {
    return (
      <Row className="pb-3 px-4 my-5">
        <Col md={12} style={{ padding: '0' }}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <Row>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Application Name:</span>
                      <span className={'my-3'}>300</span>
                      <span className={'my-3'}>Total Commits</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Repository Name:</span>
                      <span className={'my-3'}>Contributors - multiple</span>
                      <span className={'my-3'}>Average Duration to complete</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Run Number/Run Count</span>
                      <span className={'my-3'}>Trend: <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i> <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i></span>
                      <span className={'my-3'}>Run Attempts</span>
                    </div>
                  </Col>
                </Row>
              }
            />
          </DataBlockBoxContainer>
        </Col>
        <Col md={12} style={{ padding: '0' }}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <Row>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Application Name:</span>
                      <span className={'my-3'}>300</span>
                      <span className={'my-3'}>Total Commits</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Repository Name:</span>
                      <span className={'my-3'}>Contributors - multiple</span>
                      <span className={'my-3'}>Average Duration to complete</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Run Number/Run Count</span>
                      <span className={'my-3'}>Trend: <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i> <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i></span>
                      <span className={'my-3'}>Run Attempts</span>
                    </div>
                  </Col>
                </Row>
              }
            />
          </DataBlockBoxContainer>
        </Col>
        <Col md={12} style={{ padding: '0' }}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <Row>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Application Name:</span>
                      <span className={'my-3'}>300</span>
                      <span className={'my-3'}>Total Commits</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Repository Name:</span>
                      <span className={'my-3'}>Contributors - multiple</span>
                      <span className={'my-3'}>Average Duration to complete</span>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div style={{display: "grid"}}>
                      <span>Run Number/Run Count</span>
                      <span className={'my-3'}>Trend: <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i> <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'green', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i>  <i style={{color:'red', fontSize: '1.5em'}} className="fa-solid fa-circle p-1"></i></span>
                      <span className={'my-3'}>Run Attempts</span>
                    </div>
                  </Col>
                </Row>
              }
            />
          </DataBlockBoxContainer>
        </Col>
      </Row>
    );
  };

  return <>{getBody()}</>;
}

FailedExecutionsActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default FailedExecutionsActionableInsights;
