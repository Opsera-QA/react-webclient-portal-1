import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faHistory} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import ResetConfirmationPanel from "components/common/panels/general/reset/ResetConfirmationPanel";

// TODO: Allow users to select what to reset with checkboxes.
function ResetMetricConfigurationButton(
  {
    kpiConfigurationModel,
    setKpiConfiguration,
    dashboardModel,
    index,
    identifier,
    disable,
    closePanel,
    className,
  }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [defaultKpiConfiguration, setDefaultKpiConfiguration] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirmationPanel, setShowResetConfirmationPanel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

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
      setIsSaving(true);
      kpiConfigurationModel.setData("kpi_name", defaultKpiConfiguration?.name);
      kpiConfigurationModel.setData("kpi_category", defaultKpiConfiguration?.category);
      kpiConfigurationModel.setData("kpi_settings", defaultKpiConfiguration?.settings);
      kpiConfigurationModel.setData("filters", defaultKpiConfiguration?.supported_filters);
      kpiConfigurationModel.setData("tags", []);

      const configuration = dashboardModel.getData("configuration");
      const resetKpiData = kpiConfigurationModel?.getPersistData();
      configuration[index] = resetKpiData;
      setKpiConfiguration(resetKpiData);
      dashboardModel.setData("configuration", configuration);

      await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, dashboardModel);
      closePanel();
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error);
        toastContext.showServiceUnavailableDialog();
      }
    } finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  const getLabel = () => {
    if (isSaving) {
      return ("Resetting KPI");
    }

    return ("Resetting KPI to Default Configuration");
  };

  const getBody = () => {
    if (showResetConfirmationPanel === true) {
      return (
        <ResetConfirmationPanel
          model={kpiConfigurationModel}
          closePanelFunction={() => setShowResetConfirmationPanel(false)}
          resetDataFunction={resetKpiData}
        />
      );
    }

    return (
      <Button
        disabled={disable || isSaving || isLoading}
        onClick={() => setShowResetConfirmationPanel(true)}
      >
        <span>
          <IconBase
            isLoading={isSaving}
            icon={faHistory}
            className={"mr-2"}
          />
          {getLabel()}
        </span>
      </Button>
    );
  };

  if (defaultKpiConfiguration == null || dashboardModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <div>{getBody()}</div>
      <InfoText errorMessage={errorMessage} />
    </div>
  );
}

ResetMetricConfigurationButton.propTypes = {
  kpiConfigurationModel: PropTypes.object,
  setKpiConfiguration: PropTypes.func,
  dashboardModel: PropTypes.object,
  identifier: PropTypes.string,
  index: PropTypes.number,
  closePanel: PropTypes.func,
  className: PropTypes.string,
  disable: PropTypes.bool,
};

export default React.memo(ResetMetricConfigurationButton);