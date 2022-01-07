import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { useHistory } from "react-router-dom";
import SdlcBuildDurationMetric from "./metrics/build/SdlcBuildDurationMetric";
import SdlcDeployDurationMetric from "./metrics/deploy/SdlcDeployDurationMetric";
import SdlcQualityScanDurationMetric from "./metrics/quality_scan/SdlcQualityScanDurationMetric";
import SdlcSecurityScanDurationMetric from "./metrics/security_scan/SdlcSecurityScanDurationMetric";
import SdlcScriptsDurationMetric from "./metrics/scripts/SdlcScriptsDurationMetric";
import SdlcTestDurationMetric from "./metrics/test/SdlcTestDurationMetric";
import { assignStandardLineColors } from "components/insights/charts/charts-views";
import SdlcDurationStatisticsHelpDocumentation from "../../../../../common/help/documentation/insights/charts/SdlcDurationStatisticsHelpDocumentation";

function SdlcDurationByStageMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const [goalsData, setGoalsData] = useState(undefined);
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
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "opseraSdlcPipelineStageDuration",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data?.data ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data : [];
      console.log(dataObject);
      const objectLength = response?.data?.data ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data.length : 0;
      let means = response?.data?.data
        ? response?.data?.data[0]?.opseraSdlcDurationByStage?.data[objectLength - 1]
        : [];
      assignStandardLineColors(dataObject, true);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(means);
        setGoalsData(goals);
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
    if (
      !Array.isArray(metrics) ||
      metrics.length === 0 ||
      !Array.isArray(dataBlockValues) ||
      dataBlockValues.length === 0
    ) {
      return null;
    }

    return (
      <div className="new-chart mb-3 pointer" style={{ minHeight: "450px", display: "flex" }}>
        <Row className="mr-1">
          <Col xs={12} sm={6} key={`metric-build`}>
            <SdlcBuildDurationMetric
              metric={metrics[0]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.build_mean}
              countData={dataBlockValues[0]?.build_count}
              goalsData={goalsData?.average_builds}
            />
          </Col>
          <Col xs={12} sm={6} key="metric-deploy">
            <SdlcDeployDurationMetric
              metric={metrics[1]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.deploy_mean}
              countData={dataBlockValues[0]?.deploy_count}
              goalsData={goalsData?.average_deploy}
            />
          </Col>
          <Col xs={12} sm={6} key="metric-quality-scan">
            <SdlcQualityScanDurationMetric
              metric={metrics[2]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.code_scan_mean}
              countData={dataBlockValues[0]?.code_scan_count}
              goalsData={goalsData?.average_quality_scan}
            />
          </Col>
          <Col xs={12} sm={6} key="metric-security-scan">
            <SdlcSecurityScanDurationMetric
              metric={metrics[3]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.container_scan_mean}
              countData={dataBlockValues[0]?.container_scan_count}
              goalsData={goalsData?.average_security_scan}
            />
          </Col>
          <Col xs={12} sm={6} key="metric-test">
            <SdlcTestDurationMetric
              metric={metrics[4]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.testing_mean}
              countData={dataBlockValues[0]?.testing_count}
              goalsData={goalsData?.average_test}
            />
          </Col>
          <Col xs={12} sm={6} key="metric-scripts">
            <SdlcScriptsDurationMetric
              metric={metrics[5]}
              kpiConfiguration={kpiConfiguration}
              meanData={dataBlockValues[0]?.script_mean}
              countData={dataBlockValues[0]?.script_count}
              goalsData={goalsData?.average_scripts}
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
        chartHelpComponent={(closeHelpPanel) => (
          <SdlcDurationStatisticsHelpDocumentation closeHelpPanel={closeHelpPanel} />
        )}
      />
      <ModalLogs
        header="Build Duration By Stage"
        size="lg"
        jsonMessage={metrics}
        dataType="bar"
        show={showModal}
        setParentVisibility={setShowModal}
      />
    </div>
  );
}

SdlcDurationByStageMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SdlcDurationByStageMetrics;
