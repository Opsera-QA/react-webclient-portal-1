import React, { useContext } from "react";
import PropTypes from "prop-types";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import useGetNewDashboardModel from "components/insights/dashboards/hooks/useGetNewDashboardModel";

export default function CreateNewDashboardOverlay({ loadData }) {
  const toastContext = useContext(DialogToastContext);
  const { dashboardModel, setDashboardModel } = useGetNewDashboardModel();

  const closePanel = () => {
    if (loadData) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (dashboardModel == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={dashboardMetadata.type}
      loadData={loadData}
    >
      <DashboardEditorPanel
        setDashboardData={setDashboardModel}
        handleClose={closePanel}
        dashboardData={dashboardModel}
      />
    </CreateCenterPanel>
  );
}

CreateNewDashboardOverlay.propTypes = {
  loadData: PropTypes.func,
};


