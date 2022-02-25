import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {kpiIdentifierConstants} from "components/admin/kpi_identifiers/kpiIdentifier.constants";
import SdlcDurationByStageMetricsEditorPanel
  from "components/insights/charts/sdlc/bar_chart/duration_by_stage/SdlcDurationByStageMetricsEditorPanel";
import KpiSettingsForm from "components/insights/marketplace/charts/KpiSettingsForm";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import Model from "core/data_model/model";
import kpiConfigurationMetadata from "components/insights/marketplace/charts/kpi-configuration-metadata";
import MetricSettingsInputPanel from "components/common/inputs/metric/settings/MetricSettingsInputPanel";
import ResetButton from "components/common/buttons/reset/ResetButton";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import {metricHelpers} from "components/insights/metric.helpers";
import UserEditableMetricDataPointsInputPanel
  from "components/common/inputs/metric/data_points/UserEditableMetricDataPointsInputPanel";
import DeleteDashboardMetricConfirmationPanel
  from "components/insights/marketplace/dashboards/metrics/delete/DeleteDashboardMetricConfirmationPanel";
import ResetMetricConfirmationPanel
  from "components/insights/marketplace/dashboards/metrics/reset/ResetMetricConfirmationPanel";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import GenericChartSettingsHelpDocumentation
  from "components/common/help/documentation/insights/charts/GenericChartSettingsHelpDocumentation";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";

// TODO: This is temporary until kpis are updated to follow new standards
const SUPPORTED_NEW_METRICS =[
  kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS,
];

function DashboardMetricEditorPanel({
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
  // TODO: Unpack inside useEffect
  const [metricModel, setMetricModel] = useState(undefined);
  const [metricFilterModel, setMetricFilterModel] = useState(undefined);
  const [unpackedFilterData, setUnpackedFilterData] = useState(undefined);
  const [showDeleteConfirmationPanel, setShowDeleteConfirmationPanel] = useState(false);
  const [showResetConfirmationPanel, setShowResetConfirmationPanel] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  // TODO: Handle unpacking models here
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

  // TODO: Create unpack filters mechanism | turn filter array into key/value object (put in helper) Use supported filters array to determine what is a valid filter or not
  // TODO: Create pack filters mechanism | turn key/value object into filter array (put in helper) Use supported filters array to determine what is a valid filter or not
  const closeSettingsPanel = async () => {
    if (closePanel) {
      closePanel();
    }
  };

  // TODO: Make node route for saving individual KPI on a dashboard by id
  const saveKpiSettings = async () => {
    await dashboardMetricActions.updateDashboardKpiV2(getAccessToken, cancelTokenSource, dashboardData?.getData("_id"), metricModel);
  };

  const getExtraButtons = () => {
    return (
      <div className={"d-flex"}>
        <DeleteButton
          dataObject={metricModel}
          deleteRecord={() => setShowDeleteConfirmationPanel(true)}
          size={"md"}
        />
        <ResetButton
          className={"ml-2"}
          model={metricModel}
          resetFunction={() => setShowResetConfirmationPanel(true)}
        />
      </div>
    );
  };


  const getMetricEditorPanel = () => {
    switch (kpiConfiguration?.kpi_identifier) {
      case kpiIdentifierConstants.KPI_IDENTIFIERS.SDLC_DURATION_STATISTICS:
        return (
          <SdlcDurationByStageMetricsEditorPanel
            metricModel={metricModel}
            metricFilterModel={metricFilterModel}
            setMetricFilterModel={setMetricFilterModel}
            unpackedFilterData={unpackedFilterData}
          />
        );
    }
  };

  const getBody = () => {
    if (showDeleteConfirmationPanel === true) {
      return (
        <div className={"m-2"}>
          <DeleteDashboardMetricConfirmationPanel
            kpiConfigurationModel={metricModel}
            dashboardModel={dashboardData}
            closePanelFunction={closeSettingsPanel}
            index={index}
            setKpis={setKpis}
          />
        </div>
      );
    }

    if (showResetConfirmationPanel === true) {
      return (
        <div className={"m-2"}>
          <ResetMetricConfirmationPanel
            kpiConfigurationModel={metricModel}
            dashboardModel={dashboardData}
            className={"ml-2"}
            identifier={metricModel?.getData("kpi_identifier")}
            index={index}
            closePanelFunction={closeSettingsPanel}
            setKpiConfiguration={setKpiConfiguration}
          />
        </div>
      );
    }

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

    return <GenericChartSettingsHelpDocumentation closeHelpPanel={() => setHelpIsShown(false)} />;
  };

  // TODO: This is temporary for compatibility reasons.
  if (SUPPORTED_NEW_METRICS.includes(kpiConfiguration?.kpi_identifier) !== true) {
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
      <EditorPanelContainer
        handleClose={closeSettingsPanel}
        updateRecord={saveKpiSettings}
        recordDto={metricModel}
        lenient={true}
        className={"px-3 pb-3"}
        extraButtons={getExtraButtons()}
      >
        {getBody()}
      </EditorPanelContainer>
    </OverlayPanelBodyContainer>
  );
}

DashboardMetricEditorPanel.propTypes = {
  kpiConfiguration: PropTypes.object,
  dashboardData: PropTypes.object,
  index: PropTypes.number,
  closePanel: PropTypes.func,
  setKpiConfiguration: PropTypes.func,
  setKpis: PropTypes.func,
  loadData: PropTypes.func,
  settingsHelpComponent: PropTypes.object,
};

export default DashboardMetricEditorPanel;
