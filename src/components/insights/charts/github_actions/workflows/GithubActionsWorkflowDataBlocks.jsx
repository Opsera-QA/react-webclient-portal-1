import React, {useState, useEffect, useRef, useContext} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";
import {metricHelpers} from "components/insights/metric.helpers";
import githubActionsWorkflowActions from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import {
  GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS
} from "components/insights/charts/github_actions/workflows/GithubActionsWorkflow_kpi_datapoint_identifiers";
import useComponentStateReference from "hooks/useComponentStateReference";
import ThreeLineScoreDataBlock from "../../../../common/metrics/score/ThreeLineScoreDataBlock";
import {faArrowCircleDown, faArrowCircleUp, faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import ThreeLinePercentageBlockBase from "../../../../common/metrics/percentage/ThreeLinePercentageBlockBase";

function GithubActionsWorkflowDataBlocks({ kpiConfiguration, dashboardData, setError }) {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successPercentDataPoint, setSuccessPercentDataPoint] = useState(undefined);
  const [averageSuccessDataPoint, setAverageSuccessDataPoint] = useState(undefined);
  const [failurePercentDataPoint, setFailurePercentDataPoint] = useState(undefined);
  const [averageFailureDataPoint, setAverageFailureDataPoint] = useState(undefined);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [JSON.stringify(dashboardData)]);


  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadDataPoints();
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsBaseKPIDataBlocks(
          kpiConfiguration,
          getAccessToken,
          cancelTokenSource,
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

  const getIcon = (severity) => {
    switch (severity) {
      case "up":
        return faArrowCircleUp;
      case "down":
        return faArrowCircleDown;
      case "neutral":
        return faMinusCircle;
      default:
        break;
    }
  };

  const getIconColor = (severity) => {
    switch (severity) {
      case "up":
        return "red";
      case "down":
        return "green";
      case "neutral":
        return "light-gray-text-secondary";
      case "black":
        return "black";
      default:
        break;
    }
  };

  const getIconColorUpsideDown = (severity) => {
    switch (severity) {
      case "down":
        return "red";
      case "up":
        return "green";
      case "neutral":
        return "light-gray-text-secondary";
      case "black":
        return "black";
      default:
        break;
    }
  };

  const getDescription = (severity) => {
    switch (severity) {
      case "up":
        return "This parameter is trending upward";
      case "down":
        return "This parameter is trending downward";
      case "neutral":
        return "Neutral: This parameter experienced no change";
      case "black":
        return "No Trend";
    }
  };

  const loadDataPoints = async () => {
    const dataPoints = kpiConfiguration?.dataPoints;
    const successPercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_SUCCESS_PERCENT_DATA_POINT);
    setSuccessPercentDataPoint(successPercentageDataPoint);
    const avgSuccessDataPoint = dataPointHelpers.getDataPoint(dataPoints, GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_AVERAGE_SUCCESS_DATA_POINT);
    setAverageSuccessDataPoint(avgSuccessDataPoint);
    const failurePercentageDataPoint = dataPointHelpers.getDataPoint(dataPoints, GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_FAILURE_PERCENT_DATA_POINT);
    setFailurePercentDataPoint(failurePercentageDataPoint);
    const avgFailedTestsDataPoint = dataPointHelpers.getDataPoint(dataPoints, GITHUB_ACTIONS_WORKFLOW_METRIC_CONSTANTS.SUPPORTED_DATA_POINT_IDENTIFIERS.BASE_KPI_AVERAGE_FAILED_DATA_POINT);
    setAverageFailureDataPoint(avgFailedTestsDataPoint);
  };

  if (isLoading) {
    return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
  }

  return (
    <Row className={"mx-1"}>
      <Col md={4} className={"mb-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.workflows}
              subtitle={"Total Unique Workflow Names"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of unique workflow names"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={4} className={"mb-3"}>
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.runs}
              subtitle={"Total Runs"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of runs"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={4} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.repos}
              subtitle={"Total Repositories"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of repositories"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={4} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.success}
              subtitle={"Total Success Runs"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of successful runs"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      {dataPointHelpers.isDataPointVisible(successPercentDataPoint) &&
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <ThreeLinePercentageBlockBase
                className={getIconColorUpsideDown(metrics?.successPercentageTrend?.trend)}
                bottomText={"Last Scan: " + metrics?.prevSuccessPercentage}
                icon={getIcon(metrics?.successPercentageTrend?.trend)}
                iconOverlayBody={getDescription(metrics?.successPercentageTrend?.trend)}
                percentage={metrics?.successPercentage}
                subtitle={"% Success"}
                dataPoint={successPercentDataPoint}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>}
      {dataPointHelpers.isDataPointVisible(averageSuccessDataPoint) &&
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <ThreeLineScoreDataBlock
                className={getIconColor(metrics?.avgSuccessTimeTrend?.trend)}
                score={metrics?.avgSuccessTime}
                bottomText={"Last Scan: " + metrics?.prevSuccessTime}
                subtitle={"Average Time For Success Runs (mins)"}
                icon={getIcon(metrics?.avgSuccessTimeTrend?.trend)}
                iconOverlayBody={getDescription(metrics?.avgSuccessTimeTrend?.trend)}
                dataPoint={averageSuccessDataPoint}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>}
      <Col md={4} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.failures}
              subtitle={"Total Failed Runs"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of failed runs"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      {dataPointHelpers.isDataPointVisible(failurePercentDataPoint) &&
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <ThreeLinePercentageBlockBase
                className={getIconColor(metrics?.failedPercentageTrend?.trend)}
                bottomText={"Last Scan: " + metrics?.prevFailedPercentage}
                icon={getIcon(metrics?.failedPercentageTrend?.trend)}
                iconOverlayBody={getDescription(metrics?.failedPercentageTrend?.trend)}
                percentage={metrics?.failedPercentage}
                subtitle={"% Failures"}
                dataPoint={failurePercentDataPoint}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>}
      {dataPointHelpers.isDataPointVisible(averageFailureDataPoint) &&
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <ThreeLineScoreDataBlock
                className={getIconColor(metrics?.avgFailedTimeTrend?.trend)}
                bottomText={"Last Scan: " + metrics?.prevFailedTime}
                icon={getIcon(metrics?.avgFailedTimeTrend?.trend)}
                iconOverlayBody={getDescription(metrics?.avgFailedTimeTrend?.trend)}
                score={metrics?.avgFailedTime}
                subtitle={"Average Time For Failed Runs (mins)"}
                dataPoint={averageFailureDataPoint}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>}
      <Col md={3} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.jobsSkipped}
              subtitle={"Total Skipped"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of workflow that were skipped"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={3} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLinePercentageDataBlock
              percentage={metrics?.PercentageSkipped}
              subtitle={"% Skipped"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The percentage of workflow that were skipped"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={3} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLineScoreDataBlock
              score={metrics?.jobsCanceled}
              subtitle={"Total Canceled"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The total number of workflow that were cancelled"}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
      <Col md={3} className="mb-3">
        <DataBlockBoxContainer showBorder={true}>
          <div className={"p-2"}>
            <TwoLinePercentageDataBlock
              percentage={metrics?.PercentageCanceled}
              subtitle={"% Canceled"}
              icon={faInfoCircle}
              iconOverlayTitle={""}
              iconOverlayBody={"The percentage of workflow cancelled."}
            />
          </div>
        </DataBlockBoxContainer>
      </Col>
    </Row>
  );
}

GithubActionsWorkflowDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  setError: PropTypes.func
};

export default GithubActionsWorkflowDataBlocks;