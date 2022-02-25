import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/automationPercentagePieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig,
  getColorByData,
  getColor,
  assignStandardColors,
  shortenPieChartLegend,
  mainColor,
} from "../charts-views";
import { Col, Container, Row } from "react-bootstrap";
import TwoLineScoreDataBlock from "../../../common/metrics/score/TwoLineScoreDataBlock";
import { METRIC_QUALITY_LEVELS } from "../../../common/metrics/text/MetricTextBase";
import "./Styling.css";
import NewPercentageDataBlock from "../../../common/metrics/percentage/NewPercentageDataBlock";

function AutomationPercentagePieChart({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  setKpis,
  showSettingsToggle,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
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
      let notes = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "notes")]?.value;
      setNotesData(notes);
      setIsLoading(true);
      let dashboardTags =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
          ?.value;
      let dateRange =
        dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "date")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "automationPercentage",
        kpiConfiguration,
        dashboardTags,
        null,
        null,
        dashboardOrgs,
        null,
        null,
        dateRange
      );
      let dataObject = response?.data ? response?.data?.data[0]?.automationPercentage?.data : [];
      assignStandardColors(dataObject[0]?.pairs);
      shortenPieChartLegend(dataObject[0]?.pairs);
      console.log("automation", dataObject);

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
    if (!Array.isArray(metrics[0]?.pairs) || metrics[0]?.pairs.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3 p-0" style={{ height: "300px", display: "flex" }}>
        <Container>
          <Row className="p-0">
            <Col lg={4} md={6}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.totalTests}
                subtitle={"Total Number of Automation Candidates"}
              />
            </Col>
            <Col lg={4} md={6}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.functionalTests}
                subtitle={"Total Number of Functional Test Cases"}
              />
            </Col>
            <Col lg={4} md={6}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.regressionTests}
                subtitle={"Total Number of Regression Test Cases"}
              />
            </Col>
          </Row>
          <Row className="p-0">
            <Col lg={4} md={6}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.automatedTests}
                subtitle={"Regression Test Cases Automated"}
              />
            </Col>
            <Col lg={4} md={6}>
              <TwoLineScoreDataBlock
                className={"test-percentage"}
                score={metrics[0]?.manualTests}
                subtitle={"Regression Test Cases To Be Automated"}
              />
            </Col>
            <Col lg={4} md={6}>
              <NewPercentageDataBlock
                className={"test-percentage"}
                percentage={metrics[0].automationRate}
                subtitle={"Automation Percentage"}
                qualityLevel={
                  metrics[0]?.automationRate < 90 ? METRIC_QUALITY_LEVELS.DANGER : METRIC_QUALITY_LEVELS.SUCCESS
                }
                goal={"Goal: Automation Percentage > 90%"}
              />
            </Col>
          </Row>
          <Row className="p-3">
            <Col className="text-center">
              <small>{notesData} </small>
            </Col>
          </Row>
        </Container>
        <ResponsivePie
          data={metrics[0]?.pairs}
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
        showSettingsToggle={showSettingsToggle}
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

AutomationPercentagePieChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  showSettingsToggle: PropTypes.bool,
};

export default AutomationPercentagePieChart;
