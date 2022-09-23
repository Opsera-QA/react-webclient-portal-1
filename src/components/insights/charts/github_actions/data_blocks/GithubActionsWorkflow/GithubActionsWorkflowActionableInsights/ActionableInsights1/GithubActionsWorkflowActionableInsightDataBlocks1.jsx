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

function GithubActionsWorkflowActionableInsightDataBlocks1({ kpiConfiguration, dashboardData, workflowName }) {
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
      const response = await githubActionsWorkflowActions.githubActionsActionableOneDataBlocks(
          kpiConfiguration,
          getAccessToken,
          cancelSource,
          dashboardTags,
          dashboardOrgs,
          workflowName
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
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.runs}
                    subtitle={'Total Runs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The total number of runs in selected workflow'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.applications}
                    subtitle={'Total Applications'}
                    iconOverlayTitle={''}
                    icon={faInfoCircle}
                    iconOverlayBody={'The total number of applications in selected workflow'}
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
                    iconOverlayBody={'The total number of repositories in selected workflow'}
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
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.successPercentage}
                    subtitle={'% Success'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'Percent of successful runs out of all runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgSuccessTime}
                    subtitle={'Average Time For Success Runs (mins)'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'The average time taken for successful runs to complete'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
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
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLinePercentageDataBlock
                    percentage={metrics?.failedPercentage}
                    subtitle={'% Failures'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'Percent of failed runs out of all runs'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
            <Col md={4} className="mb-3">
              <DataBlockBoxContainer showBorder={true}>
                <div className={'p-2'}>
                  <TwoLineScoreDataBlock
                    score={metrics?.avgFailedTime}
                    subtitle={'Average Time For Failed Runs'}
                    icon={faInfoCircle}
                    iconOverlayTitle={''}
                    iconOverlayBody={'Average time take for failed runs to complete (mins)'}
                  />
                </div>
              </DataBlockBoxContainer>
            </Col>
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

GithubActionsWorkflowActionableInsightDataBlocks1.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName:PropTypes.string
};

export default GithubActionsWorkflowActionableInsightDataBlocks1;
