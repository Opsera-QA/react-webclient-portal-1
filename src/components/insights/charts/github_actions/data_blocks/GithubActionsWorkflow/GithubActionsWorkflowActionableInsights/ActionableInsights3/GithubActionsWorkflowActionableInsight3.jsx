import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import GithubActionsWorkflowActionableInsightDataBlocks3 from "./GithubActionsWorkflowActionableInsightDataBlocks3";
import GithubActionsWorkflowActionableTableOverlay3 from "./GithubActionsWorkflowActionableTableOverlay3";
import axios from "axios";

function GithubActionsWorkflowActionableInsight3({ kpiConfiguration, dashboardData, workflowName, repoName, appName, branchName, jobName}) {
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
              <b>Job Name:</b> {jobName}
            </div>
          </div>
        </div>
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks3
            kpiConfiguration={kpiConfiguration}
            dashboardData={dashboardData}
            workflowName={workflowName}
            repoName={repoName}
            appName={appName}
            branchName={branchName}
            jobName={jobName}
          />
          <GithubActionsWorkflowActionableTableOverlay3
              kpiConfiguration={kpiConfiguration}
              dashboardData={dashboardData}
              workflowName={workflowName}
              repoName={repoName}
              appName={appName}
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
      titleText={`Github Actions Workflow Step Summary`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight3.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string,
  repoName: PropTypes.string,
  appName: PropTypes.string,
  branchName: PropTypes.string,
  jobName: PropTypes.string
};

export default GithubActionsWorkflowActionableInsight3;