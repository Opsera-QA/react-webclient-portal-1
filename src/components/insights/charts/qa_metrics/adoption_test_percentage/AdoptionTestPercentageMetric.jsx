import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import config from "components/insights/charts/qa_metrics/adoption_test_percentage/adoptionTestPercentagePieChartConfig";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  defaultConfig, getColorByData, assignStandardColors,
  shortenPieChartLegend,
} from "components/insights/charts/charts-views";
import { Col, Container, Row } from "react-bootstrap";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import "components/insights/charts/qa_metrics/Styling.css";
import PercentageDataBlock from "components/common/metrics/percentage/PercentageDataBlock";
import {strategicCriteriaHelpers} from "components/common/helpers/strategicCriteria.helpers";

const ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS = {
  EXECUTED_TESTS: "executed_tests",
  MANUAL_TESTS: "manual_tests",
  ADOPTION_PERCENTAGE: "adoption_percentage"
};

function AdoptionTestPercentageMetric({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metric, setMetric] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
  const [adoptionPercentageDataPoint, setAdoptionPercentageDataPoint] = useState(undefined);
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
      await loadChartMetrics(cancelSource);
      await loadDataPoints(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadChartMetrics = async (cancelSource = cancelTokenSource) => {
    const notes = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "notes")]?.value;
    setNotesData(notes);
    setIsLoading(true);

    // TODO: Just save as tags inside the data object.
    let dashboardTags = dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;

    // TODO: Just return individual metric. Don't send it as this complicated data object
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "adoptionPercentage", kpiConfiguration, dashboardTags);
    const metrics = response?.data ? response?.data?.data[0]?.adoptionPercentage?.data : [];

    if (Array.isArray(metrics) && metrics.length > 0) {
      const metric = metrics[0];

      assignStandardColors(metric.pairs);
      shortenPieChartLegend(metric?.pairs);


      if (isMounted?.current === true) {
        setMetric(metric);
      }
    }
  };

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;

    let newAdoptionPercentageDataPoint = strategicCriteriaHelpers.getDataPoint(dataPoints, ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS.ADOPTION_PERCENTAGE);
    // if (newAdoptionPercentageDataPoint == null) {
    //
    // }

    // TODO: handle pulling from KPI if not attached.
    setAdoptionPercentageDataPoint(newAdoptionPercentageDataPoint);

  };

  const getChartBody = () => {
    if (!Array.isArray(metric?.pairs) || metric?.pairs.length === 0) {
      return null;
    }

    return (
      <div className="new-chart mb-3" style={{height: "300px", display: "flex"}}>
        <Container>
          <Row className="p-0">
            <Col lg={6} md={8}>
              <TwoLineScoreDataBlock
                score={metric?.executedTests}
                subtitle={"Automated Test Cases Executed"}
              />
            </Col>
            <Col lg={6} md={8}>
              <TwoLineScoreDataBlock
                score={metric?.manualTests}
                subtitle={"Automated Test Cases Executed Manually"}
              />
            </Col>
          </Row>
          <Row className="p-0 justify-content-center">
            <Col lg={6} md={8}>
              <PercentageDataBlock
                percentage={metric?.adoptionRate}
                subtitle={"Adoption Percentage"}
                dataPoint={adoptionPercentageDataPoint}
              />
            </Col>
          </Row>
          <Row className="p-4">
            <Col className="text-center">
              <small> {notesData} </small>
            </Col>
          </Row>
        </Container>
        <ResponsivePie
          data={metric?.pairs}
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
        header="Unit Test Data Stats"
        size="lg"
        jsonMessage={metric}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

AdoptionTestPercentageMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default AdoptionTestPercentageMetric;