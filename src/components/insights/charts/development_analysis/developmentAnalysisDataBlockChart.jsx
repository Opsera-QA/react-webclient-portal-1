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
import TotalArtifactsPublished from "./data_blocks/TotalArtifactsPublished";
import ArtifactsScanned from "./data_blocks/ArtifactsScanned";
import { DEVELOPMENT_ANALYSIS_METRIC_CONSTANTS as dataPointConstants} from "./Development-analysis-components-datapoints";
import { dataPointHelpers } from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import ArtifactsSuccessfulDeployments from "./data_blocks/ArtifactsSuccessfulDeployments";
import ArtifactsDeployedWithFailedSecurity from "./data_blocks/ArtifactsDeployedWithFailedSecurity";

function DevelopmentAnalysisDataBlockChart({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalArtifactsPublishedDatapoint, setTotalArtifactsPublishedDatapoint] = useState(undefined);
  const [artifactsScannedDatapoint, setArtifactsScannedDatapoint] = useState(undefined);
  const [artifactsSuccessfulDeploymentsDatapoint, setArtifactsSuccessfulDeploymentsDatapoint] = useState(undefined);
  const [artifactsDeployedWithFailedSecurityDatapoint, setArtifactsDeployedWithFailedSecurity] = useState(undefined);

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
      await loadDataPoints(cancelSource);
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

      const response = await chartsActions.getDevelopmentAnalysis(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
      );
      const dataObject = response.data?.data;
      console.log(dataObject,'****');
      /*  response?.data && response?.status === 200
          ? response?.data?.data?.data
          : [];*/

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
    const totalArtifactsPublishedDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEVELOPMENT_ANALYSIS_TOTAL_ARTIFACTS_DATA_POINT);
    setTotalArtifactsPublishedDatapoint(totalArtifactsPublishedDataPoint);
    const artifactsScanned = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEVELOPMENT_ANALYSIS_ARTIFACTS_SCANNED_DATA_POINT);
    setArtifactsScannedDatapoint(artifactsScanned);
    const artifactsSuccessfulDeploymentsDatapoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.ARTIFACTS_SUCCESSFUL_DEPLOYMENTS_DATA_POINT);
    setArtifactsSuccessfulDeploymentsDatapoint(artifactsSuccessfulDeploymentsDatapoint);
    const artifactsDeployedWithFailedSecurity = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.ARTIFACTS_DEPLOYED_WITH_FAILED_SECURITY);
    setArtifactsDeployedWithFailedSecurity(artifactsDeployedWithFailedSecurity);
   
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


  const getDescription = (severity) => {
    switch (severity) {
      case "Green":
        return "This project's issues are trending upward";
      case "Red":
        return "This project's issues are trending downward";
      case "Neutral":
        return "Neutral: This project's issues have experienced no change";
    }
  };

  const getChartBody = () => {
    if (!Array.isArray(metrics) || metrics.length === 0) {
     return null;
   }

    return (
      <div className="new-chart mb-3" style={{ minHeight: "300px" }}>
        <Container>
          <Row className="p-2 gray">
            {dataPointHelpers.isDataPointVisible(totalArtifactsPublishedDatapoint) &&
            <Col className={"mr-5"}>
              <TotalArtifactsPublished
                score={
                  metrics[0]?.results?.totalArtifactsPublished
                    ? metrics[0]?.results?.totalArtifactsPublished
                    : 0
                }
                icon={getIcon(metrics[0]?.trends?.totalArtifactsPublished)}
                className={getIconColor(metrics[0]?.trends?.totalArtifactsPublished)}
                iconOverlayBody={getDescription(metrics[0]?.trends?.totalArtifactsPublished)}
                dataPoint={totalArtifactsPublishedDatapoint}
              />
            </Col>}
            {dataPointHelpers.isDataPointVisible(artifactsScannedDatapoint) &&
            <Col>
              <ArtifactsScanned
                score={
                  metrics[0]?.results?.artifactsScanned
                    ? metrics[0]?.results?.artifactsScanned
                    : 0
                }
                icon={getIcon(metrics[0]?.trends?.artifactsScanned)}
                className={getIconColor(metrics[0]?.trends?.artifactsScanned)}
                iconOverlayBody={getDescription(metrics[0]?.trends?.artifactsScanned)}
                dataPoint={artifactsScannedDatapoint}
              />
            </Col >}
            {dataPointHelpers.isDataPointVisible(artifactsSuccessfulDeploymentsDatapoint) &&
            <Col className={"ml-5"}>
              <ArtifactsSuccessfulDeployments
                score={
                  metrics[0]?.results?.tota
                    ? metrics[0]?.result?.artifactsSuccessfulDeployments
                    : 0
                }
                icon={getIcon(metrics[0]?.trends?.artifactsSuccessfulDeployments)}
                className={getIconColor(metrics[0]?.trends?.artifactsSuccessfulDeployments)}
                iconOverlayBody={getDescription(metrics[0]?.trends?.artifactsSuccessfulDeployments)}
                dataPoint={artifactsSuccessfulDeploymentsDatapoint}
              />
            </Col>}
          </Row>
          <Row className="p-2 gray">
            {dataPointHelpers.isDataPointVisible(artifactsDeployedWithFailedSecurityDatapoint) &&
            <Col className={"mr-5"}>
              <ArtifactsDeployedWithFailedSecurity
                score={
                  metrics[0]?.results?.artifactsDeployedWithFailedSecurity
                    ? metrics[0]?.results?.artifactsDeployedWithFailedSecurity
                    : 0
                }
                icon={getIcon(metrics[0]?.trends?.artifactsDeployedWithFailedSecurity)}
                className={getIconColor(metrics[0]?.trends?.artifactsDeployedWithFailedSecurity)}
                lastScore={metrics[0]?.previousResults?.artifactsDeployedWithFailedSecurity}
                iconOverlayBody={getDescription(metrics[0]?.trends?.artifactsDeployedWithFailedSecurity)}
                dataPoint={artifactsDeployedWithFailedSecurityDatapoint}
              />
            </Col>}
            
          </Row>
        </Container>
      </div>
    );
  };
  const onRowSelect = () => {};


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
        launchActionableInsightsFunction={onRowSelect}

      />
      <ModalLogs
        header="Development Analysis Metrics"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

DevelopmentAnalysisDataBlockChart.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default DevelopmentAnalysisDataBlockChart;
