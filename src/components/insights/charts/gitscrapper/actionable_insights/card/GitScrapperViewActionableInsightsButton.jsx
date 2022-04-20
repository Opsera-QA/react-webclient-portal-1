import React, {useContext} from "react";
import PropTypes from "prop-types";
import { faSearch } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import GitScraperViewListOfIssuesOverlay from "../GitScraperViewListOfIssuesOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";

function GitScrapperViewActionableInsightsButton({ dataObject, kpiConfiguration, dashboardData }) {

  const toastContext = useContext(DialogToastContext);

  const getActionableInsights = () => {
    toastContext.showOverlayPanel(
      <GitScraperViewListOfIssuesOverlay
        dataObject={dataObject}
        kpiConfiguration={kpiConfiguration}
        dashboardData={dashboardData}
      />
    );
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
