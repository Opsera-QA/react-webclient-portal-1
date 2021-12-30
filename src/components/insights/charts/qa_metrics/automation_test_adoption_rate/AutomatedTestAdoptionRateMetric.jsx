import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  assignStandardColors, defaultConfig, getColorByData,
  shortenPieChartLegend,
} from "components/insights/charts/charts-views";
import { Col, Row } from "react-bootstrap";
import "components/insights/charts/qa_metrics/Styling.css";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import AutomatedTestAdoptionRateAdoptedTestsDataBlock
  from "components/insights/charts/qa_metrics/automation_test_adoption_rate/data_blocks/AutomatedTestAdoptionRateAdoptedTestsDataBlock";
import AutomatedTestAdoptionRateManualTestsDataBlock
  from "components/insights/charts/qa_metrics/automation_test_adoption_rate/data_blocks/AutomatedTestAdoptionRateManualTestsDataBlock";
import AutomatedTestAdoptionRateAdoptionRateDataBlock
  from "components/insights/charts/qa_metrics/automation_test_adoption_rate/data_blocks/AutomatedTestAdoptionRateAdoptionRateDataBlock";
import {hasStringValue} from "components/common/helpers/string-helpers";
import NivoPieChartBase from "components/common/metrics/charts/nivo/pie/NivoPieChartBase";
import {nivoChartLegendDefinitions} from "components/common/metrics/charts/nivo/nivoChartLegend.definitions";
import config from "./adoptionTestPercentagePieChartConfig";
import AdoptionTestPercentageChartHelpDocumentation
  from "../../../../common/help/documentation/insights/charts/AdoptionTestPercentageChartHelpDocumentation";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "../../../../common/helpers/metrics/metricTheme.helpers";
import { ResponsivePie } from "@nivo/pie";
import { Container } from "@nivo/core";

const ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS = {
  ADOPTED_TESTS: "adopted_tests",
  MANUAL_TESTS: "manual_tests",
  ADOPTION_RATE: "adoption_rate"
};

function AutomatedTestAdoptionRateMetric({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metric, setMetric] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
  const [adoptionRateDataPoint, setAdoptionRateDataPoint] = useState(undefined);
  const [automatedTestsDataPoint, setAutomatedTestsDataPoint] = useState(undefined);
  const [manualTestsDataPoint, setManualTestsDataPoint] = useState(undefined);
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

    const newAdoptionPercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS.ADOPTION_RATE);
    setAdoptionRateDataPoint(newAdoptionPercentageDataPoint);
    const newExecutedTestsDataPoint = dataPointHelpers.getDataPoint(dataPoints, ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS.ADOPTED_TESTS);
    setAutomatedTestsDataPoint(newExecutedTestsDataPoint);
    const newManualTestDataPoint = dataPointHelpers.getDataPoint(dataPoints, ADOPTION_TEST_PERCENTAGE_DATA_POINT_IDENTIFIERS.MANUAL_TESTS);
    setManualTestsDataPoint(newManualTestDataPoint);
  };

  const getNotesRow = () => {
    if (hasStringValue(notesData)) {
      return (
          <Col className="px-4 pb-4 text-center">
            <small> {notesData} </small>
          </Col>
      );
    }
  };

  const getLegendsConfiguration = () => {
    return (
      [
        nivoChartLegendDefinitions.getTopRightLegendDefinition(),
      ]
    );
  };

  const getChartBody = () => {
    if (!Array.isArray(metric?.pairs) || metric?.pairs.length === 0) {
      return null;
    }

    return (
      <div>
        <div className="new-chart mt-3 mb-3 ml-4" style={{ height: "300px", display: "flex" }}>
          <Container>
          <Row className={"my-3"}>
            <Col lg={6} >
              <AutomatedTestAdoptionRateAdoptedTestsDataBlock
                executedTestCount={metric?.executedTests}
                executedTestsDataPoint={automatedTestsDataPoint}
              />
            </Col>
            <Col lg={6}>
              <AutomatedTestAdoptionRateManualTestsDataBlock
                manualTestCount={metric?.manualTests}
                manualTestsDataPoint={manualTestsDataPoint}
              />
            </Col>
          </Row>
          <Row className={"p-1"}>
            <Col lg={6} className={"w-100 mx-auto"}>
              <AutomatedTestAdoptionRateAdoptionRateDataBlock
                score= {metric?.adoptionRate}
                adoptionRateDataPoint={adoptionRateDataPoint}
              />
            </Col>
          </Row>
          </Container>
          <Col xl={6} lg={6} md={4} className={"my-2 p-2"}>
            <ResponsivePie
              data={metric?.pairs}
              {...defaultConfig()}
              {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
              onClick={() => setShowModal(true)}
            />
          </Col>
        </div>
        <Row>
          {getNotesRow()}
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
        tableChart={true} // TODO: Don't automatically have padding on new container
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => <AdoptionTestPercentageChartHelpDocumentation closeHelpPanel={closeHelpPanel} />}
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

AutomatedTestAdoptionRateMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func
};

export default AutomatedTestAdoptionRateMetric;