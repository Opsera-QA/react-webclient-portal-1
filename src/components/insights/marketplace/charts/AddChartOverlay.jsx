import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import MarketplaceChartInfoPanel from "components/insights/marketplace/charts/MarketplaceChartInfoPanel";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faUserChart} from "@fortawesome/pro-light-svg-icons";

function AddChartOverlay({ kpiData, dashboardId }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`${kpiData.name} Chart Details`}
      titleIcon={faUserChart}
      showToasts={true}
      showCloseButton={false}
    >
      <div className={"p-3"}>
        <MarketplaceChartInfoPanel kpiData={kpiData} dashboardId={dashboardId} closePanel={closePanel} />
      </div>
    </CenterOverlayContainer>
  );
}

AddChartOverlay.propTypes = {
  kpiData: PropTypes.object,
  dashboardId: PropTypes.string
};

export default AddChartOverlay;