import React, {useState, useEffect, useRef, useContext} from "react";
import { Row,Col } from "react-bootstrap";
import axios from "axios";
import DataBlockBoxContainer from "../../../../../../../common/metrics/data_blocks/DataBlockBoxContainer";
import PropTypes from "prop-types";
import LoadingDialog from "../../../../../../../common/status_notifications/loading";
import TwoLineScoreDataBlock from "../../../../../../../common/metrics/score/TwoLineScoreDataBlock";
import TwoLinePercentageDataBlock from "../../../../../../../common/metrics/percentage/TwoLinePercentageDataBlock";
import {AuthContext} from "../../../../../../../../contexts/AuthContext";
import {metricHelpers} from "../../../../../../metric.helpers";
import githubActionsWorkflowActions from "../../github-actions-workflow-actions";
import {faInfoCircle} from "@fortawesome/pro-light-svg-icons";

function GithubActionsWorkflowActionableInsightDataBlocks3({ kpiConfiguration, dashboardData, branchName, repoName, appName, workflow, jobName }) {
  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [error, setError] = useState(undefined);
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let dashboardMetricFilter = metricHelpers.unpackMetricFilterData(dashboardData?.data?.filters);
      let dashboardTags = dashboardMetricFilter?.tags;
      let dashboardOrgs = dashboardMetricFilter?.organizations;
      const response = await githubActionsWorkflowActions.githubActionsActionableTwoDataBlocks(
        kpiConfiguration,
        getAccessToken,
        cancelSource,
        dashboardTags,
        dashboardOrgs,
        workflow,
        repoName,
        appName,
        branchName
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
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.totalJobs}
                    subtitle={'Total Jobs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of jobs in the repository'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.jobsExecuted}
                    subtitle={'Total Jobs Executed'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of jobs executed in the repository'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.jobsSkipped}
                    subtitle={'Total Jobs Skipped'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of jobs that were skipped'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.PercentageExecuted}
                    subtitle={'% Jobs Executed'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percentage of jobs that were executed'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.PercentageSkipped}
                    subtitle={'% Jobs Skipped'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percentage of jobs that were skipped'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.Success}
                    subtitle={'Total Success'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of successful jobs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.Failed}
                    subtitle={'Total Failed'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of failed jobs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.SuccessPercentage}
                    subtitle={'% Success'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percent of successful jobs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.FailedPercentage}
                    subtitle={'% Failed'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The percent of failed jobs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={3} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.jobsCanceled}
                    subtitle={'Jobs Canceled'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of jobs that were cancelled'}
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
                    iconOverlayBody={'The percentage of jobs cancelled.'}
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

GithubActionsWorkflowActionableInsightDataBlocks3.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string
};

export default GithubActionsWorkflowActionableInsightDataBlocks3;
