import React, { useState, useEffect, useRef, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "components/common/metrics/percentage/TwoLinePercentageDataBlock";
import { AuthContext } from "contexts/AuthContext";
import { metricHelpers } from "components/insights/metric.helpers";
import githubActionsWorkflowActions
  from "components/insights/charts/github_actions/workflows/github-actions-workflow-actions";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";

function GithubActionsDetailedJobSummaryDataBlocks(
  {
    kpiConfiguration,
    dashboardData,
    dashboardFilters,
    branchName,
    repoName,
    appName,
    workflowName,
    jobName,
  }) {
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    cancelTokenSource,
    isMounted,
    toastContext,
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
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      //let dashboardFilters = dashboardMetricFilter?.hierarchyFilters;
      const response = await githubActionsWorkflowActions.githubActionsActionableThreeDataBlocks(
        kpiConfiguration,
        getAccessToken,
        cancelTokenSource,
        dashboardTags,
        dashboardOrgs,
        dashboardFilters,
        workflowName,
        repoName,
        appName,
        branchName,
        jobName,
      );

      let dataObject = response?.data?.data[0];
      
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


  if (isLoading) {
    return (<LoadingDialog message={"Loading Data"} size={"sm"} />);
  }

  return (
    <div className={"mx-3"}>
      <Row style={{ justifyContent: "space-evenly" }}>
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.totalJobs}
                subtitle={"Total Steps Run"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of steps in the repository"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageExecuted}
                subtitle={"% Steps Executed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of steps that were executed"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={4} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsExecuted}
                subtitle={"Total Steps Executed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of steps executed in the repository"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsSuccess}
                subtitle={"Total Success"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of successful steps"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.SuccessPercentage}
                subtitle={"% Success"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percent of successful steps"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsFailed}
                subtitle={"Total Failed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of failed ssteps"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.FailedPercentage}
                subtitle={"% Failed"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percent of failed steps"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsSkipped}
                subtitle={"Total Steps Skipped"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of steps that were skipped"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageSkipped}
                subtitle={"% Steps Skipped"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of steps that were skipped"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLineScoreDataBlock
                score={metrics?.jobsCanceled}
                subtitle={"Steps Canceled"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The total number of steps that were cancelled"}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
        <Col md={3} className="mb-3">
          <DataBlockBoxContainer showBorder={true}>
            <div className={"p-2"}>
              <TwoLinePercentageDataBlock
                percentage={metrics?.PercentageCanceled}
                subtitle={"% Steps Canceled"}
                icon={faInfoCircle}
                iconOverlayTitle={""}
                iconOverlayBody={"The percentage of steps cancelled."}
              />
            </div>
          </DataBlockBoxContainer>
        </Col>
      </Row>
    </div>
  );
}

GithubActionsDetailedJobSummaryDataBlocks.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  dashboardFilters: PropTypes.any,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
};

export default GithubActionsDetailedJobSummaryDataBlocks;
