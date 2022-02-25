import React from "react";
import PropTypes from "prop-types";
import DeleteConfirmationPanel from "components/common/panels/general/delete/DeleteConfirmationPanel";
import DeleteDashboardMetricButton from "components/common/buttons/dashboards/metric/DeleteDashboardMetricButton";

function DeleteDashboardMetricConfirmationPanel(
  {
    kpiConfigurationModel,
    dashboardModel,
    index,
    setKpis,
    disabled,
    closePanelFunction,
    className,
  }) {
  if (kpiConfigurationModel == null) {
    return null;
  }

  return (
    <DeleteConfirmationPanel
      model={kpiConfigurationModel}
      closePanelFunction={closePanelFunction}
      deleteButton={
        <DeleteDashboardMetricButton
          kpiConfigurationModel={kpiConfigurationModel}
          dashboardModel={dashboardModel}
          closePanelFunction={closePanelFunction}
          index={index}
          setKpis={setKpis}
          disabled={disabled}
          className={className}
        />
      }
    />
  );
}

DeleteDashboardMetricConfirmationPanel.propTypes = {
  kpiConfigurationModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  setKpis: PropTypes.func,
  index: PropTypes.number,
  closePanelFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default DeleteDashboardMetricConfirmationPanel;


