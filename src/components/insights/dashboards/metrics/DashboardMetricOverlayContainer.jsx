import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";
import SdlcDurationByStageMetricsEditorPanel
  from "components/insights/charts/sdlc/bar_chart/duration_by_stage/SdlcDurationByStageMetricsEditorPanel";
import KpiSettingsForm from "components/insights/marketplace/charts/KpiSettingsForm";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Model from "core/data_model/model";
import kpiConfigurationMetadata from "components/insights/marketplace/charts/kpi-configuration-metadata";
import MetricSettingsInputPanel from "components/common/inputs/metric/settings/MetricSettingsInputPanel";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import {metricHelpers} from "components/insights/metric.helpers";
import UserEditableMetricDataPointsInputPanel
  from "components/common/inputs/metric/data_points/UserEditableMetricDataPointsInputPanel";
import GenericChartSettingsHelpDocumentation
  from "components/common/help/documentation/insights/charts/GenericChartSettingsHelpDocumentation";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";
import DashboardMetricEditorPanelContainer
  from "components/common/panels/detail_panel_container/dashboard_metrics/DashboardMetricEditorPanelContainer";

// TODO: combine with chart settings overlay?
function DashboardMetricOverlayContainer({
  kpiConfiguration,
  setKpiConfiguration,
  dashboardData,
  index,
  closePanel,
  loadData,
  setKpis,
  settingsHelpComponent,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const [helpIsShown, setHelpIsShown] = useState(false);
  const [metricModel, setMetricModel] = useState(undefined);
  const [metricFilterModel, setMetricFilterModel] = useState(undefined);
  const [unpackedFilterData, setUnpackedFilterData] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setUnpackedFilterData(undefined);
    setMetricModel(undefined);

    if (kpiConfiguration) {
      initializeData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [kpiConfiguration]);

  const initializeData = async () => {
    setMetricModel({...new Model(kpiConfiguration, kpiConfigurationMetadata, false)});
    setUnpackedFilterData(metricHelpers.unpackMetricFilterData(kpiConfiguration?.filters));
  };

  const closeSettingsPanel = async () => {
    if (closePanel) {
      closePanel();
    }
  };

  // TODO: Once legacy KPI Settings panel is removed, this can be moved into the Dashboard Metric Button Container
  const saveKpiSettings = async () => {
    const packedFilters = metricHelpers.packFilterData(metricFilterModel?.getPersistData());
    metricModel?.setData("filters", packedFilters);
    await dashboardMetricActions.updateDashboardKpiV2(
      getAccessToken,
      cancelTokenSource,
      dashboardData?.getData("_id"),
      metricModel,
    );
  };


  const getMetricEditorPanel = () => {
    // switch (kpiConfiguration?.kpi_identifier) {
    //   case kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS:
    //     return (
    //       <SdlcDurationByStageMetricsEditorPanel
    //         metricModel={metricModel}
    //         metricFilterModel={metricFilterModel}
    //         setMetricFilterModel={setMetricFilterModel}
    //         unpackedFilterData={unpackedFilterData}
    //       />
    //     );
    // }
  };

  const getBody = () => {

    return (
      <div>
        <TextInputBase
          fieldName={"kpi_name"}
          dataObject={metricModel}
          setDataObject={setMetricModel}
        />
        <MetricSettingsInputPanel
          metricModel={metricModel}
          setMetricModel={setMetricModel}
          metricSettings={metricModel?.getData("settings")}
        />
        {getMetricEditorPanel()}
        <UserEditableMetricDataPointsInputPanel
          model={metricModel}
          setModel={setMetricModel}
        />
      </div>
    );
  };

  const getHelpComponent = () => {
    if (settingsHelpComponent) {
      settingsHelpComponent(() => setHelpIsShown(false));
    }

    return (
      <GenericChartSettingsHelpDocumentation
        closeHelpPanel={() => setHelpIsShown(false)}
      />
    );
  };

  // TODO: This is temporary for compatibility reasons.
  if (getMetricEditorPanel() == null) {
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
  }

  if (metricModel == null) {
    return (
      <LoadingDialog
        size={"md"}
        message={"Loading Settings Panel"}
      />
    );
  }

  return (
    <OverlayPanelBodyContainer
      helpComponent={getHelpComponent()}
      helpIsShown={helpIsShown}
      setHelpIsShown={setHelpIsShown}
      hideCloseButton={true}
    >
      <DashboardMetricEditorPanelContainer
        saveDataFunction={saveKpiSettings}
        closePanelFunction={closeSettingsPanel}
        metricModel={metricModel}
        setKpis={setKpis}
        metricIndex={index}
        dashboardModel={dashboardData}
        setKpiConfiguration={setKpiConfiguration}
        className={"px-3 pb-3"}
      >
        {getBody()}
      </DashboardMetricEditorPanelContainer>
    </OverlayPanelBodyContainer>
  );
}

DashboardMetricOverlayContainer.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  closePanel: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadData: PropTypes.func,
  settingsHelpComponent: PropTypes.object,
};

export default DashboardMetricOverlayContainer;
