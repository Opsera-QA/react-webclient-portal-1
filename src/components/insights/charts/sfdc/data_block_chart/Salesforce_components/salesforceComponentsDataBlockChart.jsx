import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { faArrowCircleDown, faArrowCircleUp, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import TotalComponentsDeployed from "./data_blocks/TotalComponentsDeployed";
import AvgComponentsDeployedPerExecution from "./data_blocks/AvgComponentsDeployedPerExecution";
import TotalSalesforcePipelineExecutions from "./data_blocks/TotalSalesforcePipelineExecutions";
import TotalPipelineExecutionDeployment from "./data_blocks/TotalPipelineExecutionDeployment";
import TotalPipelineExecutionValidation from "./data_blocks/TotalPipelineExecutionValidation";
import TotalPipelinesExecutionsUnitTests from "./data_blocks/TotalPipelinesExecutionsUnitTests";
import { dataPointHelpers } from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import { SALESFORCE_COMPONENTS_METRIC_CONSTANTS as dataPointConstants} from "./Salesforce-components-datapoints";

function SalesforceComponentsDataBlockChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalComponentsDataPoint, setTotalComponentsDatapoint] = useState(undefined);
  const [averageDataPoint, setAverageDatapoint] = useState(undefined);
  const [totalSalesforceDataPoint, setTotalSalesforceDatapoint] = useState(undefined);
  const [deploymentDataPoint, setDeploymentDatapoint] = useState(undefined);
  const [validationDataPoint, setValidationDatapoint] = useState(undefined);
  const [unitTestsDataPoint, setUnitTestsDatapoint] = useState(undefined);

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
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex((obj) => obj.type === "tags")
          ]?.value;
      let dashboardOrgs =
        dashboardData?.data?.filters[
          dashboardData?.data?.filters.findIndex(
            (obj) => obj.type === "organizations",
          )
          ]?.value;

      const response = await chartsActions.getSfdcMetrics(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
      );

     console.log("response", response);
      const dataObject =
        response?.data && response?.status === 200
          ? response?.data?.data?.data[0]
          : [];

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
    const salesforceTotalComponentsDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_TOTAL_COMPONENTS_DATA_POINT);
    setTotalComponentsDatapoint(salesforceTotalComponentsDataPoint);
    const salesforceAverageDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_AVERAGE_DATA_POINT);
    setAverageDatapoint(salesforceAverageDataPoint);
    const totalExecutionsDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_TOTAL_EXECUTIONS_DATA_POINT);
    setTotalSalesforceDatapoint(totalExecutionsDataPoint);
    const salesforceDeploymentDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_DEPLOYMENTS_DATA_POINT);
    setDeploymentDatapoint(salesforceDeploymentDataPoint);
    const salesforceValidationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_VALIDATION_DATA_POINT);
    setValidationDatapoint(salesforceValidationDataPoint);
    const salesforceUnitTestsDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.SALESFORCE_UNIT_TESTS_DATA_POINT);
    setUnitTestsDatapoint(salesforceUnitTestsDataPoint);
  };

  const getIcon = (severity) => {
    switch (severity) {
      case "Green":
        return faArrowCircleUp;
      case "Red":
        return faArrowCircleDown;
      case "Neutral":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case "Red":
        return "red";
      case "Green":
        return "green";
      case "Neutral":
        return "light-gray-text-secondary";
      case "-":
        return "black";
      default:
        break;
    }
  };

  const getIconTitle = (severity) => {
    switch (severity) {
      case "Red":
        return "Risk";
      case "Green":
        return "Success";
      case "Neutral":
        return "Same as Earlier";
      case "-":
        return "No Trend";
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "Red":
        return "This project's issues are trending upward";
      case "Green":
        return "This project's issues are trending downward";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };
  console.log(metrics, "metrics");
  const getChartBody = () => {
   //  if (!Array.isArray(metrics) || metrics.length === 0) {
   //   return null;
   // }

    return (
      <div className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Container>
          <Row className="p-2 gray">
            {dataPointHelpers.isDataPointVisible(totalComponentsDataPoint) &&
            <Col className={"mr-5"}>
              <TotalComponentsDeployed
                score={
                  metrics?.currentResults?.totalComponentsDeployed
                    ? metrics?.currentResults?.totalComponentsDeployed
                    : 0
                }
                icon={getIcon(metrics?.trends?.totalComponentsDeployed)}
                className={getIconColor(metrics?.trends?.totalComponentsDeployed)}
                lastScore={metrics?.previousResults?.totalComponentsDeployed}
                iconOverlayBody={getDescription(metrics[0]?.overallLowTrend)}
                dataPoint={totalComponentsDataPoint}
              />
            </Col>}
            {dataPointHelpers.isDataPointVisible(averageDataPoint) &&
            <Col>
              <AvgComponentsDeployedPerExecution
                score={
                  metrics?.currentResults?.averageComponentsDeployedPerExecution
                    ? metrics?.currentResults?.averageComponentsDeployedPerExecution
                    : 0
                }
                icon={getIcon(metrics?.trends?.averageComponentsDeployedPerExecution)}
                className={getIconColor(metrics?.trends?.averageComponentsDeployedPerExecution)}
                lastScore={metrics?.previousResults?.averageComponentsDeployedPerExecution}
                iconOverlayBody={getDescription(metrics[0]?.overallMediumTrend)}
                dataPoint={averageDataPoint}
              />
            </Col >}
            {dataPointHelpers.isDataPointVisible(totalSalesforceDataPoint) &&
            <Col className={"ml-5"}>
              <TotalSalesforcePipelineExecutions
                score={
                  metrics?.currentResults?.totalSalesforcePipelineExecutions
                    ? metrics?.currentResults?.totalSalesforcePipelineExecutions
                    : 0
                }
                icon={getIcon(metrics?.trends?.totalSalesforcePipelineExecutions)}
                className={getIconColor(metrics?.trends?.totalSalesforcePipelineExecutions)}
                lastScore={metrics?.previousResults?.totalSalesforcePipelineExecutions}
                iconOverlayBody={getDescription(metrics[0]?.overallHighTrend)}
                dataPoint={totalSalesforceDataPoint}
              />
            </Col>}
          </Row>
          <Row className="p-2 gray">
            {dataPointHelpers.isDataPointVisible(deploymentDataPoint) &&
            <Col className={"mr-5"}>
              <TotalPipelineExecutionDeployment
                score={
                  metrics?.currentResults?.totalPipelineExecutionsWithDeployment
                    ? metrics?.currentResults?.totalPipelineExecutionsWithDeployment
                    : 0
                }
                icon={getIcon(metrics?.trends?.totalPipelineExecutionsWithDeployment)}
                className={getIconColor(metrics?.trends?.totalPipelineExecutionsWithDeployment)}
                lastScore={metrics?.previousResults?.totalPipelineExecutionsWithDeployment}
                iconOverlayBody={getDescription(metrics[0]?.overallLowTrend)}
                dataPoint={deploymentDataPoint}
              />
            </Col>}
            {dataPointHelpers.isDataPointVisible(validationDataPoint) &&
            <Col >
              <TotalPipelineExecutionValidation
                score={
                  metrics?.currentResults?.totalPipelineExecutionsWithValidation
                    ? metrics?.currentResults?.totalPipelineExecutionsWithValidation
                    : 0
                }
                icon={getIcon(metrics?.trends?.totalPipelineExecutionsWithValidation)}
                className={getIconColor(metrics?.trends?.totalPipelineExecutionsWithValidation)}
                lastScore={metrics?.previousResults?.totalPipelineExecutionsWithValidation}
                iconOverlayBody={getDescription(metrics[0]?.overallMediumTrend)}
                dataPoint={validationDataPoint}
              />
            </Col>}
            {dataPointHelpers.isDataPointVisible(unitTestsDataPoint) &&
            <Col className={"ml-5"}>
              <TotalPipelinesExecutionsUnitTests
                score={
                  metrics?.currentResults?.totalPipelineExecutionsWithUnitTests
                    ? metrics?.currentResults?.totalPipelineExecutionsWithUnitTests
                    : 0
                }
                icon={getIcon(metrics?.trends?.totalPipelineExecutionsWithUnitTests)}
                className={getIconColor(metrics?.trends?.totalPipelineExecutionsWithUnitTests)}
                lastScore={metrics?.previousResults?.totalPipelineExecutionsWithUnitTests}
                iconOverlayBody={getDescription(metrics[0]?.overallHighTrend)}
                dataPoint={unitTestsDataPoint}
              />
            </Col>}
          </Row>
        </Container>
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
        header="Salesforce Components Metrics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SalesforceComponentsDataBlockChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SalesforceComponentsDataBlockChart;
