import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import DeleteConfirmationPanel from "components/common/panels/general/delete/DeleteConfirmationPanel";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faTrash} from "@fortawesome/pro-light-svg-icons";

function DeleteDashboardMetricConfirmationPanel(
  {
    metricModel,
    dashboardModel,
    index,
    setKpis,
    closePanelFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
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
  }, []);

  const deleteDashboardMetric = async () => {
    await dashboardMetricActions.deleteDashboardKpiV2(
      getAccessToken,
      cancelTokenSource,
      dashboardModel?.getData("_id"),
      metricModel?.getData("_id"),
    );

    // This is a workaround necessary for hiding the KPI after it's deleted.
    dashboardModel?.getData("configuration").splice(index, 1);
    setKpis(dashboardModel?.getData("configuration"));

    if (closePanelFunction) {
      closePanelFunction();
    }
  };

  if (metricModel == null) {
    return null;
  }

  // TODO: Is there a DeleteOverlay?
  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      showPanel={true}
      titleIcon={faTrash}
      titleText={`Delete ${metricModel?.getData("kpi_name")} Confirmation`}
      showCloseButton={false}
    >
      <div className={"m-3"}>
        <DeleteConfirmationPanel
          model={metricModel}
          closePanelFunction={closePanelFunction}
          deleteDataFunction={deleteDashboardMetric}
        />
      </div>
    </CenterOverlayContainer>
  );
}

DeleteDashboardMetricConfirmationPanel.propTypes = {
  metricModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  setKpis: PropTypes.func,
  index: PropTypes.number,
  closePanelFunction: PropTypes.func,
};

export default DeleteDashboardMetricConfirmationPanel;


