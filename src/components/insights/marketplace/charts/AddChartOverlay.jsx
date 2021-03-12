import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import KpiInfoView from "components/insights/marketplace/charts/KpiInfoView";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {DialogToastContext} from "contexts/DialogToastContext";
import {faFileInvoice} from "@fortawesome/pro-light-svg-icons";

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
      titleText={`KPI Details`}
      titleIcon={faFileInvoice}
      showToasts={true}
    >
      <div className={"p-3"}>
        <KpiInfoView kpiData={kpiData} dashboardId={dashboardId} handleClose={closePanel} />
      </div>
    </CenterOverlayContainer>
  );
}

AddChartOverlay.propTypes = {
  kpiData: PropTypes.object,
  dashboardId: PropTypes.string
};

export default AddChartOverlay;