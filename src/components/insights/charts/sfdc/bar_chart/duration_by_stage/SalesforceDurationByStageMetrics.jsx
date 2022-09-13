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
import SalesforceDurationByStageHelpDocumentation from "../../../../../common/help/documentation/insights/charts/SalesforceDurationByStageHelpDocumentation";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  SALESFORCE_DURATION_BY_STAGE_METRICS_CONSTANTS as dataPointConstants
} from "./SalesforceDurationByStageMetrics_kpi_datapoint_identifiers";

function SalesforceDurationByStageMetrics({ kpiConfiguration, setKpiConfiguration, dashboardData, index, setKpis, dataPresent, setDataPresent }) {
  const history = useHistory();
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [mockDataShown, setMockDataShown] = useState(false);
  const [dataBlockValues, setDataBlockValues] = useState([]);
  const [goalsData, setGoalsData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [deploymentDataPoint, setDeploymentDataPoint] = useState(undefined);
  const [backupDataPoint, setBackupDataPoint] = useState(undefined);
  const [profileMigrationDataPoint, setProfileMigrationDataPoint] = useState(undefined);
  const [packageValidationDataPoint, setPackageValidationDataPoint] = useState(undefined);
  const [createPackageDataPoint, setCreatePackageDataPoint] = useState(undefined);
  const [unitTestingDataPoint, setUnitTestingDataPoint] = useState(undefined);
  const mockData = [
    [
        {
            "id": "Create Package",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 2.9,
                    "count": 35,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 0,
                  "count": 0,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 2.9
        }
    ],
    [
        {
            "id": "Validate Package",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 2.26,
                    "count": 41,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 0,
                  "count": 0,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 2.26
        }
    ],
    [
        {
            "id": "Profile Migration",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 1.35,
                    "count": 4,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 0,
                  "count": 0,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 1.35
        }
    ],
    [
        {
            "id": "Back Up",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 1.35,
                    "count": 23,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 0,
                  "count": 0,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 1.35
        }
    ],
    [
        {
            "id": "Unit Testing",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 5.16,
                    "count": 11,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 0,
                  "count": 0,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 5.16
        }
    ],
    [
        {
            "id": "Deploy",
            "data": [
                {
                    "_id": "2022-08-17T07:00:00.000Z",
                    "lowerBound": "2022-08-17T07:00:00.000Z",
                    "upperBound": "2022-08-24T07:00:00.000Z",
                    "x": "2022-08-17",
                    "y": 1.93,
                    "count": 10,
                    "range": "2022-08-17 to 2022-08-24"
                },
                {
                  "_id": "2022-08-24T07:00:00.000Z",
                  "lowerBound": "2022-08-24T07:00:00.000Z",
                  "upperBound": "2022-09-01T07:00:00.000Z",
                  "x": "2022-08-24",
                  "y": 1.88,
                  "count": 7,
                  "range": "2022-08-24 to 2022-09-01"
              },
                {
                    "_id": "2022-09-01",
                    "x": "2022-09-01",
                    "y": 0,
                    "count": 0,
                    "lowerBound": "2022-09-0107:00:00.000Z",
                    "upperBound": "2022-09-0107:00:00.000Z",
                    "range": "2022-09-01 to 2022-09-01"
                }
            ],
            "min": 0,
            "max": 1.93
        }
    ],
];
  const meansMockData = [
    {
        "_id": 1,
        "create_package_count": 35,
        "validate_package_count": 41,
        "backup_count": 23,
        "unit_testing_count": 11,
        "profile_migration_count": 4,
        "artifact_push_count": 23,
        "deploy_count": 17,
        "create_package_mean": 2.9,
        "validate_package_mean": 2.26,
        "unit_testing_mean": 5.16,
        "profile_migration_mean": 1.35,
        "backup_mean": 1.35,
        "artifact_push_mean": 3.65,
        "deploy_mean": 1.93
    }
];

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
      let goals = kpiConfiguration?.filters[kpiConfiguration?.filters.findIndex((obj) => obj.type === "goals")]?.value;
      setGoalsData(goals);
      const response = await chartsActions.parseConfigurationAndGetChartMetricsFreeTrial(
        getAccessToken,
        cancelSource,
        "salesforceDurationByStage",
        kpiConfiguration
      );

    let dataObject = response?.data && response?.data?.data[0]?.salesforceDurationByStage?.data[6].length > 0? response?.data?.data[0]?.salesforceDurationByStage?.data : mockData;
    let means = response?.data && response?.data?.data[0]?.salesforceDurationByStage?.data[6].length > 0 ? response?.data?.data[0]?.salesforceDurationByStage?.data[6] : meansMockData;
      assignStandardLineColors(dataObject, true);
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
        setDataBlockValues(means);
      }
      if (dataObject === mockData) {
        setMockDataShown(true);
        setDataPresent(false);
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
    const deployDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.DEPLOYMENT_DATA_POINT);
    setDeploymentDataPoint(deployDurationDataPoint);
    const createPackageDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.CREATE_PACKAGE_DATA_POINT);
    setCreatePackageDataPoint(createPackageDurationDataPoint);
    const packageValidationDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.PACKAGE_VALIDATION_DATA_POINT);
    setPackageValidationDataPoint(packageValidationDurationDataPoint);
    const profileMigrationDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.PROFILE_MIGRATION_DATA_POINT);
    setProfileMigrationDataPoint(profileMigrationDurationDataPoint);
    const unitTestingDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.UNIT_TESTING_DATA_POINT);
    setUnitTestingDataPoint(unitTestingDurationDataPoint);
    const backupDurationDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BACKUP_DURATION_DATA_POINT);
    setBackupDataPoint(backupDurationDataPoint);
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
      <div className="new-chart mb-2" style={{ minHeight: "300px" }}>
        <Row className="mr-1">
          {dataPointHelpers.isDataPointVisible(createPackageDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforceCreatePackageDurationMetric
              metric={metrics[0]}
              createPackageDurationMeanInMinutes={dataBlockValues[0]?.create_package_mean}
              createPackageTotalRunCount={dataBlockValues[0]?.create_package_count}
              goalsData={goalsData?.average_builds}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={createPackageDataPoint}
            />
          </Col> }
          {dataPointHelpers.isDataPointVisible(packageValidationDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforcePackageValidationDurationMetric
              metric={metrics[1]}
              packageValidationDurationMeanInMinutes={dataBlockValues[0]?.validate_package_mean}
              packageValidationTotalRunCount={dataBlockValues[0]?.validate_package_count}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={packageValidationDataPoint}
            />
          </Col> }
          {dataPointHelpers.isDataPointVisible(profileMigrationDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforceProfileMigrationDurationMetrics
              metric={metrics[2]}
              profileMigrationDurationMeanInMinutes={dataBlockValues[0]?.profile_migration_mean}
              profileMigrationTotalRunCount={dataBlockValues[0]?.profile_migration_count}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={profileMigrationDataPoint}
            />
          </Col> }
          {dataPointHelpers.isDataPointVisible(backupDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforceBackupDurationMetric
              metric={metrics[3]}
              backupDurationMeanInMinutes={dataBlockValues[0]?.backup_mean}
              backupTotalRunCount={dataBlockValues[0]?.backup_count}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={backupDataPoint}
            />
          </Col> }
          {dataPointHelpers.isDataPointVisible(unitTestingDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforceUnitTestingDurationMetric
              metric={metrics[4]}
              unitTestingDurationMeanInMinutes={dataBlockValues[0]?.unit_testing_mean}
              unitTestingTotalRunCount={dataBlockValues[0]?.unit_testing_count}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={unitTestingDataPoint}
            />
          </Col> }
          {dataPointHelpers.isDataPointVisible(deploymentDataPoint) &&
          <Col xs={12} sm={6}>
            <SalesforceDeploymentDurationMetric
              metric={metrics[5]}
              deploymentDurationMeanInMinutes={dataBlockValues[0]?.deploy_mean}
              deploymentTotalRunCount={dataBlockValues[0]?.deploy_count}
              goalsData={goalsData?.average_deployments}
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              dataPoint={deploymentDataPoint}
            />
          </Col> }
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
        dataPresent={mockDataShown}
        chartHelpComponent={(closeHelpPanel) => (
          <SalesforceDurationByStageHelpDocumentation closeHelpPanel={closeHelpPanel} />
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

SalesforceDurationByStageMetrics.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  dataPresent: PropTypes.bool,
  setDataPresent: PropTypes.func
};

export default SalesforceDurationByStageMetrics;
