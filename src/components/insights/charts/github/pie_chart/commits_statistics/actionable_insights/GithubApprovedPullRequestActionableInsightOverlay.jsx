import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { faTable, faCodeMerge } from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import GithubMergedCommitsTab from "./tableData/GithubMergedCommitsTab";

function GithubCommitsActionableInsightOverlay({ kpiConfiguration, dashboardData, highestMergesMetric , repository }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={"Github Approved Pull Requests"}
      showToasts={true}
      titleIcon={faTable}
      // isLoading={isLoading}
      linkTooltipText={"View Full Blueprint"}
    >
      <div className={"p-3"}>
        <GithubMergedCommitsTab
          dashboardData={dashboardData}
          kpiConfiguration={kpiConfiguration}
          repository={repository}
          icon={faCodeMerge}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GithubCommitsActionableInsightOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  highestMergesMetric: PropTypes.array,
  repository: PropTypes.string,
};

export default GithubCommitsActionableInsightOverlay;
