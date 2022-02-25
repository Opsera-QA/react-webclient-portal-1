import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import ResetButton from "components/common/buttons/reset/ResetButton";
import ResetMetricConfirmationPanel
  from "components/insights/marketplace/dashboards/metrics/reset/ResetMetricConfirmationPanel";

function ResetDashboardMetricButton(
  {
    metricModel,
    resetKpiModel,
    dashboardModel,
    index,
    disabled,
    closePanelFunction,
    className,
    setKpiConfiguration, // TODO: Remove ASAP. Only in here due to dashboard detail view bug
  }) {
  const toastContext = useContext(DialogToastContext);

  const showConfirmationOverlay = () => {
    toastContext.showOverlayPanel(
      <ResetMetricConfirmationPanel
        kpiConfigurationModel={metricModel}
        dashboardModel={dashboardModel}
        className={"ml-2"}
        identifier={metricModel?.getData("kpi_identifier")}
        index={index}
        closePanelFunction={closePanelFunction}
        setKpiConfiguration={setKpiConfiguration}
      />
    );
  };

  if (metricModel == null || dashboardModel == null) {
    return null;
  }

  return (
    <ResetButton
      className={className}
      model={metricModel}
      resetFunction={showConfirmationOverlay}
      disabled={disabled || resetKpiModel?.isChanged() === false}
    />
  );
}

ResetDashboardMetricButton.propTypes = {
  metricModel: PropTypes.object,
  resetKpiModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  index: PropTypes.number,
  closePanelFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setKpiConfiguration: PropTypes.func,
};

export default  React.memo(ResetDashboardMetricButton);