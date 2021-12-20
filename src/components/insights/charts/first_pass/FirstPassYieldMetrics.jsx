import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "./firstPassYieldMetricConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColorByData, assignStandardColors, shortenPieChartLegend } from "../charts-views";
import { Col, Container, Row } from "react-bootstrap";
import FirstPassYieldMetricDataBlockBase from "./data_blocks/FirstPassYieldMetricDataBlockBase";
import FirstPassYieldPercentageDataBlock from "./data_blocks/FirstPassYieldPercentageDataBlock";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

const FIRST_PASS_YIELD = "first_pass_yield";

function FirstPassYieldMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [firstPassYieldDataPoint, setFirstPassYieldDataPoint] = useState(undefined);

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
  }, [JSON.stringify(dashboardData)]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      await loadChartMetrics(cancelSource);
      await loadDataPoints(cancelSource);
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

  const loadChartMetrics = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      cancelSource,
      "firstPassYield",
      kpiConfiguration,
      dashboardTags
    );
    let dataObject = response?.data ? response?.data?.data[0]?.firstPassYield?.data : [];
    assignStandardColors(dataObject[0]?.pairs);
    shortenPieChartLegend(dataObject[0]?.pairs);

    if (isMounted?.current === true && dataObject) {
      setMetrics(dataObject);
    }
  };

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const firstPassYieldPercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, FIRST_PASS_YIELD);
    setFirstPassYieldDataPoint(firstPassYieldPercentageDataPoint);
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
      return null;
    }
    return (
      <div className="new-chart m-3 p-0" style={{ minHeight: "300px", display: "flex" }}>
        <Row>
          <Col xl={6} lg={6} md={8} className={"d-flex "}>
            <Row>
              <Col lg={6} className={"my-3"}>
                <FirstPassYieldMetricDataBlockBase
                  score={metrics[0]?.totalTests}
                  subtitle="Total Test Cases Planned for First Run"
                />
              </Col>
              <Col lg={6} className={"my-3"}>
                <FirstPassYieldPercentageDataBlock
                  score={metrics[0]?.firstPassYield}
                  dataPoint={firstPassYieldDataPoint}
                />
              </Col>
              <Col lg={6} className={"mb-3"}>
                <FirstPassYieldMetricDataBlockBase
                  score={metrics[0]?.passedTests}
                  subtitle="Total Test Cases Passed in First Run"
                />
              </Col>
              <Col lg={6} className={"mb-3"}>
                <FirstPassYieldMetricDataBlockBase
                  score={metrics[0]?.failedTests}
                  subtitle="Total Test Cases Failed in First Run"
                />
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={6} md={4} className={"my-2 p-2"}>
            <ResponsivePie
              data={metrics[0]?.pairs}
              {...defaultConfig()}
              {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
              onClick={() => setShowModal(true)}
            />
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <ChartContainer
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
      />
      <ModalLogs
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

FirstPassYieldMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default FirstPassYieldMetrics;
