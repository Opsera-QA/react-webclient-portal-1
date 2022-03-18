import React, { useEffect, useState, useRef } from "react";
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

function SuccessPercentActionableInsights({ kpiConfiguration, dashboardData }) {
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
          <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
            <ResponsivePie
              data={data}
              {...defaultConfig()}
              {...chartConfig(METRIC_THEME_CHART_PALETTE_COLORS)}
            />
            <div style={{textAlign: 'center', marginLeft: '2rem'}}>
              Top 5 Applications
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
            <div style={{textAlign: 'center', marginLeft: '2rem'}}>
              Top Five Actions
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
            <div style={{textAlign: 'center', marginLeft: '2rem'}}>
              Top Five Jobs
            </div>
          </div>
        </Col>
      </Row>
    );
  };

  const getSuccessPercentSummaryTextBoxes = () => {
    return (
      <Row className="pb-3 px-2 my-5">
        <Col md={6}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <div style={{display: "grid"}}>
                  <span>Application Name</span>
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
        <Col md={6}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <div style={{display: "grid"}}>
                  <span>Application Name</span>
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
        <Col md={6} className={"my-4"}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <div style={{display: "grid"}}>
                  <span>Application Name</span>
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
        <Col md={6} className={"my-4"}>
          <DataBlockBoxContainer showBorder={true} className={'github-actions-border-left'}>
            <MetricContentDataBlockBase
              title={"Action Name"}
              content={
                <div style={{display: "grid"}}>
                  <span>Application Name</span>
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
      </Row>

    );
  };

  return <>{getBody()}</>;
}

SuccessPercentActionableInsights.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default SuccessPercentActionableInsights;
