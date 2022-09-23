import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import GithubActionsWorkflowActionableInsightDataBlocks1 from "./GithubActionsWorkflowActionableInsightDataBlocks1";
import axios from "axios";
import GithubActionsWorkflowActionableTableOverlay1 from "./GithubActionsWorkflowActionableTableOverlay1";

function GithubActionsWorkflowActionableInsight1({ kpiConfiguration, dashboardData, workflowName}) {
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

  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };

  const getBody = () => {
    return (
      <div>
        <div className={"p-2"}>
          <div className={"d-flex details-title-text"}>
            <div className={'mr-4'}>
              <b>Unique Workflow Name:</b> {workflowName}
            </div>
          </div>
        </div>
        <div className="new-chart mb-3 mb-3 ml-3 all-github-actions-data-block">
          <GithubActionsWorkflowActionableInsightDataBlocks1 kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} workflowName={workflowName}/>
          <GithubActionsWorkflowActionableTableOverlay1 kpiConfiguration={kpiConfiguration} dashboardData={dashboardData} workflowName={workflowName}/>
        </div>
      </div>
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Github Actions Detailed Workflow Summary`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubActionsWorkflowActionableInsight1.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  workflowName: PropTypes.string
};

export default GithubActionsWorkflowActionableInsight1;