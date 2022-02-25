import React from "react";
import PropTypes from "prop-types";
import DashboardMetricButtonContainer
  from "components/common/panels/detail_panel_container/dashboard_metrics/DashboardMetricButtonContainer";
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: After final refactor of pipeline configurations, this component might be irrelevant
function DashboardMetricEditorPanelContainer(
  {
    children,
    isLoading,
    closePanelFunction,
    dashboardModel,
    setKpis,
    metricModel,
    metricIndex,
    saveDataFunction,
    className,
  }) {
  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={className}>
      <div>{children}</div>
      <DashboardMetricButtonContainer
        dashboardModel={dashboardModel}
        setKpis={setKpis}
        closePanelFunction={closePanelFunction}
        metricModel={metricModel}
        saveDataFunction={saveDataFunction}
        metricIndex={metricIndex}
      />
      {/*<RequiredFieldsMessage />*/}
    </div>
  );
}


DashboardMetricEditorPanelContainer.propTypes = {
  dashboardModel: PropTypes.object,
  metricModel: PropTypes.object,
  setKpis: PropTypes.func,
  closePanelFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  saveDataFunction: PropTypes.func,
  className: PropTypes.string,
  metricIndex: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default DashboardMetricEditorPanelContainer;