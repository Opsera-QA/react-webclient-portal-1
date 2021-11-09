import React, { useState, useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import ModalLogs from "components/common/modal/modalLogs";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import chartsActions from "components/insights/charts/charts-actions";
import ChartContainer from "components/common/panels/insights/charts/ChartContainer";
import { useHistory } from "react-router-dom";
import SalesforceBackupDurationMetric from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/backup/SalesforceBackupDurationMetric";
import SalesforceCreatePackageDurationMetric from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/create_package/SalesforceCreatePackageDurationMetric";
import SalesforceProfileMigrationDurationMetrics from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/profile_migration/SalesforceProfileMigrationDurationMetric";
import SalesforceUnitTestingDurationMetric from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/unit_testing/SalesforceUnitTestingDurationMetric";
import SalesforcePackageValidationDurationMetric from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/validation/SalesforcePackageValidationDurationMetric";
import SalesforceDeploymentDurationMetric from "components/insights/charts/sfdc/bar_chart/duration_by_stage/metrics/deployment/SalesforceDeploymentDurationMetric";
import { assignStandardLineColors } from "components/insights/charts/charts-views";

function SalesforceDurationByStageMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis }) {
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
      setGoalsData(goals);
      const response = await chartsActions.parseConfigurationAndGetChartMetrics(
        getAccessToken,
        cancelSource,
        "salesforceDurationByStage",
        kpiConfiguration,
        dashboardTags
      );
      let dataObject = response?.data ? response?.data?.data[0]?.salesforceDurationByStage?.data : [];
      let means = response?.data ? response?.data?.data[0]?.salesforceDurationByStage?.data[6] : [];
      assignStandardLineColors(dataObject, true);
      console.log(dataObject);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(means);
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

  const onRowSelect = (rowData) => {
    history.push(`/blueprint/${rowData.data._id.pipelineId}/${rowData.data._id.run}`);
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
      <div className="new-chart mb-3" style={{ minHeight: "450px", display: "flex" }}>
        <Row>
          <Col xs={12} sm={6}>
            <SalesforceCreatePackageDurationMetric
              metric={metrics[0]}
              meanData={dataBlockValues[0]?.create_package_mean}
              countData={dataBlockValues[0]?.create_package_count}
              goalsData={goalsData?.average_builds}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SalesforcePackageValidationDurationMetric
              metric={metrics[1]}
              meanData={dataBlockValues[0]?.validate_package_mean}
              countData={dataBlockValues[0]?.validate_package_count}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SalesforceProfileMigrationDurationMetrics
              metric={metrics[2]}
              meanData={dataBlockValues[0]?.profile_migration_mean}
              countData={dataBlockValues[0]?.profile_migration_count}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SalesforceBackupDurationMetric
              metric={metrics[3]}
              meanData={dataBlockValues[0]?.backup_mean}
              countData={dataBlockValues[0]?.backup_count}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SalesforceUnitTestingDurationMetric
              metric={metrics[4]}
              meanData={dataBlockValues[0]?.unit_testing_mean}
              countData={dataBlockValues[0]?.unit_testing_count}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SalesforceDeploymentDurationMetric
              metric={metrics[5]}
              meanData={dataBlockValues[0]?.deploy_mean}
              countData={dataBlockValues[0]?.deploy_count}
              goalsData={goalsData?.average_deployments}
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

SalesforceDurationByStageMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
};

export default SalesforceDurationByStageMetrics;
