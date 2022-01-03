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
import { Col, Row } from "react-bootstrap";
import SeleniumTestsTotalDataBlock from "./data_blocks/tests_total/SeleniumTestsTotalDataBlock";
import SeleniumTestsCasesPassedDataBlock from "./data_blocks/tests_passed/SeleniumTestsCasesPassedDataBlock";
import SeleniumTestsCasesFailedDataBlock from "./data_blocks/tests_failed/SeleniumTestsCasesFailedDataBlock";
import SeleniumTestsCasesBlockedDataBlock from "./data_blocks/tests_blocked/SeleniumTestsCasesBlockedDataBlock";
import SeleniumTestsCasesNotExecutedBlock from "./data_blocks/tests_not_executed/SeleniumTestsCasesNotExecutedBlock";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";

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
      <div className="new-chart m-3 p-0" style={{ minHeight: "300px", display: "flex" }}>
        <Row>
          <Col xl={6} lg={6} md={6}>
            <Row>
              <Col xl={6} lg={6} className={"mb-3"} >
                <SeleniumTestsTotalDataBlock score={metrics[0]?.testsRun?.toString()} />
              </Col>
              <Col xl={6} lg={6} className={"mb-3"} >
                <SeleniumTestsCasesPassedDataBlock score={metrics[0]?.testsPassed?.toString()} />
              </Col>
              <Col xl={6} lg={6} className={"mb-3"} >
                <SeleniumTestsCasesFailedDataBlock score={metrics[0]?.testsFailed?.toString()} />
              </Col>
              <Col xl={6} lg={6} className={"mb-3"} >
                <SeleniumTestsCasesBlockedDataBlock score={metrics[0]?.blockedTests?.toString()} />
              </Col>
            </Row>
            <Row>
              <Col xl={12} lg={12} className={"mb-3"} >
                <SeleniumTestsCasesNotExecutedBlock score={metrics[0]?.notExecutedTests?.toString()} />
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={6} md={6} className={"my-2 p-2"}>
            <div style={{ height: "300px" }}>
              <ResponsivePie
                data={metrics[0]?.testsSummary}
                {...defaultConfig()}
                {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
                onClick={() => setShowModal(true)}
              />
            </div>
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
