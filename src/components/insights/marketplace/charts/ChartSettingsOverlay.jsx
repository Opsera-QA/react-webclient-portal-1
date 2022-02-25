import React, { useContext } from "react";
import PropTypes from "prop-types";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import KpiSettingsForm from "components/insights/marketplace/charts/KpiSettingsForm";
import {faCogs} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";
import DashboardMetricEditorPanel from "components/insights/dashboards/metrics/DashboardMetricEditorPanel";

function ChartSettingsOverlay(
  {
    kpiConfiguration,
    setKpiConfiguration,
    dashboardData,
    index,
    loadData,
    setKpis,
    isMounted,
    settingsHelpComponent,
  }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getBody = () => {
    // switch (kpiConfiguration?.kpi_identifier) {
    //   case kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS:
    //     return (
    //       <DashboardMetricEditorPanel
    //         kpiConfiguration={kpiConfiguration}
    //         setKpiConfiguration={setKpiConfiguration}
    //         settingsHelpComponent={settingsHelpComponent}
    //         dashboardData={dashboardData}
    //         index={index}
    //         loadChart={loadData}
    //         setKpis={setKpis}
    //         closePanel={closePanel}
    //       />
    //     );
    // }

    return (
      <KpiSettingsForm
        kpiConfiguration={kpiConfiguration}
        setKpiConfiguration={setKpiConfiguration}
        settingsHelpComponent={settingsHelpComponent}
        dashboardData={dashboardData}
        index={index}
        loadChart={loadData}
        setKpis={setKpis}
        closePanel={closePanel}
      />
    );
  };

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleIcon={faCogs}
      titleText={`Editing ${kpiConfiguration?.kpi_name} Settings`}
      showCloseButton={false}
    >
      {getBody()}
    </CenterOverlayContainer>
  );
}

ChartSettingsOverlay.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  setKpis: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  loadData: PropTypes.func,
  isMounted: PropTypes.object,
  settingsHelpComponent: PropTypes.object,
};

export default ChartSettingsOverlay;
