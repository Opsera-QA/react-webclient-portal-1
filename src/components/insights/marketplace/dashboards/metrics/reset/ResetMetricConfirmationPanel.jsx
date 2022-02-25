import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ResetConfirmationPanel from "components/common/panels/general/reset/ResetConfirmationPanel";
import ResetMetricOptionsEditorPanel
  from "components/insights/marketplace/dashboards/metrics/reset/ResetMetricOptionsEditorPanel";
import Model from "core/data_model/model";
import {resetMetricMetadata} from "components/insights/marketplace/dashboards/metrics/reset/resetMetric.metadata";
import axios from "axios";
import {hasStringValue} from "components/common/helpers/string-helpers";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";
import {parseError} from "components/common/helpers/error-helpers";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import InfoText from "components/common/inputs/info_text/InfoText";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faHistory} from "@fortawesome/pro-light-svg-icons";

function ResetMetricConfirmationPanel(
  {
    closePanelFunction,
    metricModel,
    dashboardModel,
    identifier,
    index,
    setKpiConfiguration, // TODO: This is a workaround for the Dashboard refresh issue. Remove ASAP.
  }) {
  const [defaultKpiConfiguration, setDefaultKpiConfiguration] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resetKpiModel, setResetKpiModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setResetKpiModel(new Model({...resetMetricMetadata.newObjectFields}, resetMetricMetadata, false));
    setDefaultKpiConfiguration(undefined);

    if (hasStringValue(identifier)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [identifier]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getKpiConfiguration(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getKpiConfiguration = async (cancelSource = cancelTokenSource) => {
    const response = await KpiActions.getKpiByIdentifier(getAccessToken, cancelSource, identifier);
    const kpiConfiguration = response?.data?.data;

    if (isMounted?.current === true && kpiConfiguration) {
      setDefaultKpiConfiguration(kpiConfiguration);
    }
  };

  const resetKpiData = async () => {
    try {
      if (resetKpiModel.getData("name") === true) {
        metricModel?.setData("kpi_name", defaultKpiConfiguration?.name);
      }

      if (resetKpiModel.getData("internalProperties") === true) {
        metricModel?.setData("kpi_category", defaultKpiConfiguration?.category);
        metricModel?.setData("kpi_settings", defaultKpiConfiguration?.settings);
        metricModel?.setData("filters", defaultKpiConfiguration?.supported_filters);
        metricModel.setData("dataPoints", defaultKpiConfiguration?.dataPoints);
      }

      const configuration = dashboardModel.getData("configuration");
      const resetKpiData = metricModel?.getPersistData();
      configuration[index] = resetKpiData;
      setKpiConfiguration({...resetKpiData});
      dashboardModel.setData("configuration", configuration);

      await dashboardMetricActions.updateDashboardKpiV2(
        getAccessToken,
        cancelTokenSource,
        dashboardModel?.getData("_id"),
        metricModel
      );
      toastContext.showResetSuccessToast("KPI Configuration");

      if (closePanelFunction) {
        closePanelFunction();
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setErrorMessage(parsedError);
      }
    }
  };

  const getSubPanel = () => {
    return (
      <div className={"my=2"}>
        <ResetMetricOptionsEditorPanel
          resetKpiModel={resetKpiModel}
          setResetKpiModel={setResetKpiModel}
        />
      </div>
    );
  };

  if (metricModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanelFunction}
      showPanel={true}
      titleIcon={faHistory}
      titleText={`Reset ${metricModel?.getData("kpi_name")} Confirmation`}
      showCloseButton={false}
    >
      <ResetConfirmationPanel
        model={metricModel}
        closePanelFunction={closePanelFunction}
        subPanel={getSubPanel()}
        resetDataFunction={resetKpiData}
        disabled={isLoading}
      />
      <InfoText errorMessage={errorMessage} />
    </CenterOverlayContainer>
  );
}

ResetMetricConfirmationPanel.propTypes = {
  metricModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  closePanelFunction: PropTypes.func,
  identifier: PropTypes.string,
  index: PropTypes.number,
  setKpiConfiguration: PropTypes.func,
};

export default ResetMetricConfirmationPanel;


