import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import GithubActionsWorkflowActionableInsightDataBlocks2 from "./GithubActionsWorkflowActionableInsightsDataBlock2";
import GithubActionsWorkflowActionableTableOverlay2 from "./GithubActionsWorkflowActionableTableOverlay2";
import axios from "axios";

function GithubActionsWorkflowActionableInsight2({ kpiConfiguration, dashboardData, workflowName, repoName, appName, workflow, branchName, jobName, workflowRuns}) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(dashboardData)]);

  const toastContext1 = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext1.removeInlineMessage();
    toastContext1.clearInfoOverlayPanel();
  };

  const getBody = () => {
    return (
      <div>
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
              <b>Workflow Name:</b> {workflowName}
            </div>
            <div className={'mr-4'}>
              <b>Repository Name:</b> {repoName}
            </div>
            <div className={'mr-4'}>
              <b>Application Name:</b> {appName}
            </div>
            <div className={'mr-4'}>
              <b>Branch Name:</b> {branchName}
            </div>
            <div className={'mr-4'}>
              <b>Workflow Runs:</b> {workflowRuns}
            </div>
          </div>
        </div>
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks2
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsWorkflowActionableTableOverlay2
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            workflow={workflow}
            branchName={branchName}
            jobName={jobName}
          />
        </div>
      </div>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Github Actions Workflow Job Summary`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight2.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  workflow: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string,
  workflowRuns: PropTypes.string
};

export default GithubActionsWorkflowActionableInsight2;