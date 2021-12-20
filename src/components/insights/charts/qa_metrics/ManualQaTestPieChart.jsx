import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/manualQaTestPieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColorByData, assignStandardColors, shortenPieChartLegend } from "../charts-views";
import { Col, Container, Row } from "react-bootstrap";
import TwoLineScoreDataBlock from "../../../common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import { dataPointHelpers } from "../../../common/helpers/metrics/data_point/dataPoint.helpers";
import { METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY } from "components/common/helpers/metrics/metricTheme.helpers";

const MANUAL_TESTING_RESULTS_DATA_POINT_IDENTIFIERS = {
  passRateDataPoint: "manual-testing-results-quality-level",
};

function ManualQaTestPieChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [passRateDataPoint, setPassRateDataPoint] = useState(undefined);

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
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "manualTestData",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data ? response?.data?.data[0]?.manualTestData?.data : [];
      assignStandardColors(dataObject[0]?.pairs);
      shortenPieChartLegend(dataObject[0]?.pairs);

      // Loads the Data Points from the KPI Configuration
      await loadDataPoints();

      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
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

    const thisPassRateDataPoint = dataPointHelpers.getDataPoint(
      dataPoints,
      MANUAL_TESTING_RESULTS_DATA_POINT_IDENTIFIERS?.passRateDataPoint
    );
    setPassRateDataPoint(thisPassRateDataPoint);
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics[0]?.pairs) || metrics[0]?.pairs.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px", display: "flex" }}>
        <Container>
          <Row className="p-1">
            <Col>
              <TwoLineScoreDataBlock score={metrics[0]?.totalTests} subtitle={"Total Number of test Available"} />
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <TwoLineScoreDataBlock score={metrics[0].totalExecuted} subtitle={"Total Number of Tests executed"} />
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <TwoLinePercentageDataBlock
                percentage={metrics[0]?.passRate}
                subtitle={"Pass Rate"}
                dataPoint={passRateDataPoint}
              />
            </Col>
          </Row>
        </Container>
        <ResponsivePie
          data={metrics[0]?.pairs}
          {...defaultConfig()}
          {...config(getColorByData, METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY)}
          onClick={() => setShowModal(true)}
        />
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

ManualQaTestPieChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default ManualQaTestPieChart;
