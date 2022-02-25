import React, {useContext} from 'react';
import PropTypes from "prop-types";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import DeleteDashboardMetricConfirmationPanel
  from "components/insights/marketplace/dashboards/metrics/delete/DeleteDashboardMetricConfirmationPanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function DeleteDashboardMetricButton(
  {
    metricModel,
    dashboardModel,
    index,
    setKpis,
    disabled,
    closePanelFunction,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const showConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <DeleteDashboardMetricConfirmationPanel
        metricModel={metricModel}
        dashboardModel={dashboardModel}
        closePanelFunction={closePanelFunction}
        index={index}
        setKpis={setKpis}
      />
    );
  };

  if (metricModel == null || dashboardModel == null) {
    return null;
  }

  return (
    <DeleteButton
      size={"md"}
      className={className}
      dataObject={metricModel}
      deleteRecord={showConfirmationOverlay}
      disabled={disabled}
    />
  );
}

DeleteDashboardMetricButton.propTypes = {
  metricModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  setKpis: PropTypes.func,
  index: PropTypes.number,
  closePanelFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default  React.memo(DeleteDashboardMetricButton);