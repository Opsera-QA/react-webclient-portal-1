import React, {useContext} from "react";
import PropTypes from "prop-types";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import GitScraperViewListOfIssuesOverlay from "../GitScraperViewListOfIssuesOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {useHistory} from "react-router-dom";

function GitScrapperViewActionableInsightsButton({ dataObject, kpiConfiguration, dashboardData }) {

  const toastContext = useContext(DialogToastContext);
  let history = useHistory();

  const getActionableInsights = () => {
    const {repository, branch} = dataObject.getPersistData();
    console.log("repository", repository);
    console.log("branch", branch);
    // toastContext.showOverlayPanel(
    //   <GitScraperViewListOfIssuesOverlay
    //     dataObject={dataObject}
    //     kpiConfiguration={kpiConfiguration}
    //     dashboardData={dashboardData}
    //   />
    // );
    toastContext.clearOverlayPanel();
    history.push(`/insights/reports/scans/gitscraper/${repository}/${branch}`);
  };

  return (
    <div>
      <ActionBarButton
        action={() => getActionableInsights()}
        icon={faSearch}
        popoverText={`View Actionable Insights`}
      />
    </div>
  );
}

GitScrapperViewActionableInsightsButton.propTypes = {
  dataObject: PropTypes.object,
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
};

export default GitScrapperViewActionableInsightsButton;
