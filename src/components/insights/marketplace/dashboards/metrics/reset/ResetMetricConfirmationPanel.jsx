import React from "react";
import PropTypes from "prop-types";
import ResetConfirmationPanel from "components/common/panels/general/reset/ResetConfirmationPanel";
import ResetMetricConfigurationButton from "components/common/buttons/dashboards/ResetMetricConfigurationButton";

function ResetMetricConfirmationPanel(
  {
    closePanelFunction,
    kpiConfigurationModel,
    dashboardModel,
    identifier,
    index,
    setKpiConfiguration, // TODO: This is a workaround for the Dashboard refresh issue. Remove ASAP.
  }) {
  // TODO: Add checkboxes to determine what to reset
  const getSubPanel = () => {
    // if (subPanel) {
    //   return (
    //     <div className={"my=2"}>
    //       {subPanel}
    //     </div>
    //   );
    // }
  };

  if (kpiConfigurationModel == null) {
    return null;
  }

  return (
    <ResetConfirmationPanel
      model={kpiConfigurationModel}
      closePanelFunction={closePanelFunction}
      subPanel={getSubPanel()}
      resetButton={
        <ResetMetricConfigurationButton
          kpiConfigurationModel={kpiConfigurationModel}
          dashboardModel={dashboardModel}
          className={"ml-2"}
          identifier={identifier}
          index={index}
          closePanel={closePanelFunction}
          setKpiConfiguration={setKpiConfiguration}
        />
      }
    />
  );
}

ResetMetricConfirmationPanel.propTypes = {
  kpiConfigurationModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  closePanelFunction: PropTypes.func,
  resetDataFunction: PropTypes.func,
  identifier: PropTypes.string,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
};

export default ResetMetricConfirmationPanel;


