import React, {useState, useEffect, useRef, useContext} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "../../../../../common/status_notifications/loading";
import {AuthContext} from "../../../../../../contexts/AuthContext";
import TwoLinePercentageDataBlock from "../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import TwoLineScoreDataBlock from "../../../../../common/metrics/score/TwoLineScoreDataBlock";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";
import {metricHelpers} from "../../../../metric.helpers";
import githubActionsWorkflowActions from "./github-actions-workflow-actions";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";
import {
  GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS as dataPointConstants
} from "./GithubActionsWorkflow_kpi_datapoint_identifiers";

function GithubActionsWorkflowDataBlocks({ kpiConfiguration, dashboardData, setError }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [successPercentDataPoint, setSuccessPercentDataPoint] = useState(undefined);
  const [averageSuccessDataPoint, setAverageSuccessDataPoint] = useState(undefined);
  const [failurePercentDataPoint, setFailurePercentDataPoint] = useState(undefined);
  const [averageFailureDataPoint, setAverageFailureDataPoint] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadDataPoints(cancelSource);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsBaseKPIDataBlocks(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs,
          dashboardFilters
      );
      let dataObject = response?.data?.data[0];
      if (isMounted?.current === true && dataObject) {
        setMetrics(dataObject);
      }
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

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const successPercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_SUCCESS_PERCENT_DATA_POINT);
    setSuccessPercentDataPoint(successPercentageDataPoint);
    const avgSuccessDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_AVERAGE_SUCCESS_DATA_POINT);
    setAverageSuccessDataPoint(avgSuccessDataPoint);
    const failurePercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_FAILURE_PERCENT_DATA_POINT);
    setFailurePercentDataPoint(failurePercentageDataPoint);
    const avgFailedTestsDataPoint = dataPointHelpers.getDataPoint(dataPoints, dataPointConstants.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_AVERAGE_FAILED_DATA_POINT);
    setAverageFailureDataPoint(avgFailedTestsDataPoint);
  };


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


  const getBody = () => {
    if (isLoading) {
      return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
    }

    return (
        <>
          <div>
            <Row style={{justifyContent: "space-evenly"}}>
              <Col md={4} className="mb-3">
                <DataBlockBoxContainer showBorder={true}>
                  <div className={'p-2'}>
                    <TwoLineScoreDataBlock
                        score={metrics?.workflows}
                        subtitle={'Total Unique Workflow Names'}
                        icon={faInfoCircle}
                        iconOverlayTitle={''}
                        iconOverlayBody={'The total number of unique workflow names'}
                    />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.runs}
                    subtitle={'Total Runs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.repos}
                    subtitle={'Total Repositories'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of repositories'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.success}
                    subtitle={'Total Success Runs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of successful runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            {dataPointHelpers.isDataPointVisible(successPercentDataPoint) &&
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.successPercentage}
                    subtitle={'% Success'}
                    dataPoint={successPercentDataPoint}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col> }
            {dataPointHelpers.isDataPointVisible(averageSuccessDataPoint) &&
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgSuccessTime}
                    subtitle={'Average Time For Success Runs (mins)'}
                    dataPoint={averageSuccessDataPoint}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col> }
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.failures}
                    subtitle={'Total Failed Runs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of failed runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            {dataPointHelpers.isDataPointVisible(failurePercentDataPoint) &&
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.failedPercentage}
                    subtitle={'% Failures'}
                    dataPoint={failurePercentDataPoint}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col> }
            {dataPointHelpers.isDataPointVisible(averageFailureDataPoint) &&
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgFailedTime}
                    subtitle={'Average Time For Failed Runs (mins)'}
                    dataPoint={averageFailureDataPoint}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col> }
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.jobsSkipped}
                    subtitle={'Total Skipped'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of workflow that were skipped'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.PercentageSkipped}
                    subtitle={'% Skipped'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percentage of workflow that were skipped'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.jobsCanceled}
                    subtitle={'Total Canceled'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of workflow that were cancelled'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.PercentageCanceled}
                    subtitle={'% Canceled'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percentage of workflow cancelled.'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return getBody();
}

GithubActionsWorkflowDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  setError: PropTypes.func
};

export default GithubActionsWorkflowDataBlocks;