import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/selenium/pie_chart/SeleniumTestSummaryPercentagesConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { defaultConfig, getColorByData, assignStandardColors, shortenPieChartLegend } from "../../charts-views";
import { Col, Container, Row } from "react-bootstrap";

function SeleniumTestSummaryPercentages({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
        "seleniumTestPercentageResults",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data ? response?.data?.data[0]?.seleniumTestPercentageResults?.data : [];
      assignStandardColors(dataObject[0]?.testsSummary);
      shortenPieChartLegend(dataObject[0]?.testsSummary);

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

  const getChartBody = () => {
    if (!Array.isArray(metrics[0]?.testsSummary) || metrics[0]?.testsSummary.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{ height: "300px", display: "flex" }}>
        <Container>
          <Row className="p-1">
            <Col>
              <div className="metric-box text-center">
                <div className="box-metric">
                  <div>{metrics[0]?.testsRun}</div>
                </div>
                <div className="w-100 text-muted mb-1">Total Test Cases</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box text-center">
                <div className="box-metric">
                  <div className="green">{metrics[0]?.testsPassed}</div>
                </div>
                <div className="w-100 text-muted mb-1">Test Cases Passed</div>
              </div>
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <div className="metric-box text-center">
                <div className="box-metric">
                  <div className="red">{metrics[0]?.testsFailed}</div>
                </div>
                <div className="w-100 text-muted mb-1">Test Cases Failed</div>
              </div>
            </Col>
            <Col>
              <div className="metric-box text-center">
                <div className="box-metric">
                  <div>{metrics[0]?.blockedTests}</div>
                </div>
                <div className="w-100 text-muted mb-1">Test Cases Blocked</div>
              </div>
            </Col>
          </Row>
          <Row className="p-1">
            <Col>
              <div className="metric-box text-center">
                <div className="box-metric">
                  <div>{metrics[0]?.notExecutedTests}</div>
                </div>
                <div className="w-100 text-muted mb-1">Test Cases Not Executed</div>
              </div>
            </Col>
          </Row>
        </Container>
        <ResponsivePie
          data={metrics[0]?.testsSummary}
          {...defaultConfig()}
          {...config(getColorByData)}
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
        header="Selenium Tests Summary"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      />
    </div>
  );
}

SeleniumTestSummaryPercentages.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SeleniumTestSummaryPercentages;
