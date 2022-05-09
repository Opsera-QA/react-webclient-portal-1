import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import {DialogToastContext} from "contexts/DialogToastContext";
import DashboardEditorPanel from "components/insights/dashboards/dashboard_details/DashboardEditorPanel";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import DashboardModel from "components/insights/dashboards/dashboard.model";

function NewDashboardModal({ loadData, isMounted }) {
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [dashboardData, setDashboardData] = useState(undefined);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    createNewDashboardModel(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
    };
  }, []);

  const createNewDashboardModel = async (cancelSource = cancelTokenSource) => {
    try {
      const accessRoleData = await getAccessRoleData();
      const newDashboard = new DashboardModel(
        { ...dashboardMetadata.newObjectFields },
        dashboardMetadata,
        true,
        getAccessToken,
        cancelSource,
        loadData,
        accessRoleData,
        [],
        setDashboardData,
      );
      setDashboardData(newDashboard);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (dashboardData == null) {
    return null;
  }

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={dashboardMetadata.type}
      loadData={loadData}
    >
      <DashboardEditorPanel
        setDashboardData={setDashboardData}
        handleClose={closePanel}
        dashboardData={dashboardData}
      />
    </CreateCenterPanel>
  );
}

NewDashboardModal.propTypes = {
  loadData: PropTypes.func,
  isMounted: PropTypes.object
};

export default NewDashboardModal;