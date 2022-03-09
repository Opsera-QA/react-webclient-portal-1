import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import {
  assignStandardColors,
  shortenPieChartLegend,
  defaultConfig,
  getColorByData,
} from "components/insights/charts/charts-views";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import { Col, Row } from "react-bootstrap";
import "components/insights/charts/qa_metrics/Styling.css";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { nivoChartLegendDefinitions } from "components/common/metrics/charts/nivo/nivoChartLegend.definitions";
import AutomationPercentageChartHelpDocumentation from "components/common/help/documentation/insights/charts/AutomationPercentageChartHelpDocumentation";
import { AUTOMATION_PERCENTAGE_METRIC_CONSTANTS as dataPointConstants } from "./AutomationPercentageMteric_kpi_datapoint_identifiers";
import { ResponsivePie } from "@nivo/pie";
import config from "./automationPercentageMetricConfig";
import {
  METRIC_THEME_CHART_PALETTE_COLORS,
  METRIC_CHART_STANDARD_HEIGHT,
} from "components/common/helpers/metrics/metricTheme.helpers";
import AutomationPercentageDataBlock from "./data_blocks/AutomationPercentageDataBlock";
import TotalAutomationCandidatesDataBlock from "./data_blocks/TotalAutomationCandidatesDataBlock";
import TotalFunctionalTestsDataBlock from "./data_blocks/TotalFunctionalTestsDataBlock";
import TotalRegressionTestsDataBlock from "./data_blocks/TotalRegressionTestsDataBlock";
import RegressionTestsAutomatedDataBlock from "./data_blocks/RegressionTestsAutomatedDataBlock";
import RegressionTestsToBeAutomated from "./data_blocks/RegressionTestsToBeAutomated";

function CumulativeOpenDefectsMetric({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metric, setMetric] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notesData, setNotesData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [automationDataPoint, setAutomationDataPoint] = useState(undefined);
  const [totalAutomationCandidates, setTotalAutomationCandidates] = useState(undefined);
  const [totalFunctionalTest, setTotalFunctionalTest] = useState(undefined);
  const [totalRegressionTests, setTotalRegressionTests] = useState(undefined);
  const [regressionTestAutomation, setRegressionTestAutomation] = useState(undefined);
  const [regressionTestToBeAutomated, setRegressionTestToBeAutomated] = useState(undefined);

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
    const notes = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "notes")]?.value;
    setNotesData(notes);
    setIsLoading(true);

    let dashboardTags =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")]?.value;
    let dashboardOrgs =
      dashboardData?.data?.filters[dashboardData?.data?.filters.findIndex((obj) => obj.type === "organizations")]
        ?.value;
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      cancelSource,
      "automationPercentage",
      kpiConfiguration,
      dashboardTags,
      null,
      null,
      dashboardOrgs
    );

    const metrics = response?.data ? response?.data?.data[0]?.automationPercentage?.data : [];

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
    const automationPercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.AUTOMATION_PERCENTAGE_DATA_POINT);
    setAutomationDataPoint(automationPercentageDataPoint);
    const totalAutomationCandidatesDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.TOTAL_AUTOMATION_CANDIDATES_DATA_POINT);
    setTotalAutomationCandidates(totalAutomationCandidatesDataPoint);
    const totalFunctionalTestDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.TOTAL_FUNCTIONAL_TESTS_DATA_POINT);
    setTotalFunctionalTest(totalFunctionalTestDataPoint);
    const totalRegressionTestsDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.TOTAL_REGRESSION_TESTS_DATA_POINT);
    setTotalRegressionTests(totalRegressionTestsDataPoint);
    const regressionTestAutomationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.REGRESSION_TESTS_AUTOMATION_DATA_POINT);
    setRegressionTestAutomation(regressionTestAutomationDataPoint);
    const regressionTestToBeAutomatedDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.REGRESSION_TESTS_TO_BE_AUTOMATED_DATA_POINT);
    setRegressionTestToBeAutomated(regressionTestToBeAutomatedDataPoint);
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

  const getChartBody = () => {
    if (!metric) {
      return null;
    }

    return (
      <div>
        <div className="new-chart m-3 p-0" style={{ minheight: "300px", display: "flex" }}>
          <Row>
            <Col xl={6} lg={6} md={8} className={"d-flex align-content-around"}>
              <Row>
                {dataPointHelpers.isDataPointVisible(totalAutomationCandidates) &&
                <Col lg={6} className={"my-3"}>
                  <TotalAutomationCandidatesDataBlock defects={metric?.totalTests} dataPoint={totalAutomationCandidates}/>
                </Col> }
                {dataPointHelpers.isDataPointVisible(totalFunctionalTest) &&
                <Col lg={6} className={"my-3"}>
                  <TotalFunctionalTestsDataBlock defects={metric?.functionalTests} dataPoint={totalFunctionalTest}/>
                </Col> }
                {dataPointHelpers.isDataPointVisible(totalRegressionTests) &&
                <Col lg={6} className={"mb-3"}>
                  <TotalRegressionTestsDataBlock defects={metric?.regressionTests} dataPoint={totalRegressionTests}/>
                </Col> }
                {dataPointHelpers.isDataPointVisible(regressionTestAutomation) &&
                <Col lg={6} className={"mb-3"}>
                  <RegressionTestsAutomatedDataBlock defects={metric?.automatedTests} dataPoint={regressionTestAutomation}/>
                </Col> }
                {dataPointHelpers.isDataPointVisible(regressionTestToBeAutomated) &&
                <Col lg={6} className={"mb-3"}>
                  <RegressionTestsToBeAutomated defects={metric?.manualTests} dataPoint={regressionTestToBeAutomated}/>
                </Col>  }
                {dataPointHelpers.isDataPointVisible(automationDataPoint) &&
                <Col lg={6} className={"mb-3"}>
                  <AutomationPercentageDataBlock score={metric?.automationRate} dataPoint={automationDataPoint} />
                </Col> }
              </Row>
            </Col>
            <Col xl={6} lg={4} md={3} className={"my-2 p-2"}>
              <div style={{ height: METRIC_CHART_STANDARD_HEIGHT }}>
                <ResponsivePie
                  data={metric?.pairs}
                  {...defaultConfig()}
                  {...config(getColorByData, METRIC_THEME_CHART_PALETTE_COLORS)}
                  onClick={() => setShowModal(true)}
                />
              </div>
            </Col>
          </Row>
        </div>
        <Row>{getNotesRow()}</Row>
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
        tableChart={true}
        loadChart={loadData}
        dashboardData={dashboardData}
        index={index}
        error={error}
        setKpis={setKpis}
        isLoading={isLoading}
        chartHelpComponent={(closeHelpPanel) => (
          <AutomationPercentageChartHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
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

CumulativeOpenDefectsMetric.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default CumulativeOpenDefectsMetric;
