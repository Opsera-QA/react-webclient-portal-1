import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import KpiActions from "components/admin/kpi_identifiers/kpi.actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import InfoText from "components/common/inputs/info_text/InfoText";
import {parseError} from "components/common/helpers/error-helpers";
import ResetButton from "components/common/buttons/reset/ResetButton";

function ResetMetricConfigurationButton(
  {
    kpiConfigurationModel,
    resetKpiModel,
    dashboardModel,
    index,
    identifier,
    disabled,
    closePanel,
    className,
    setKpiConfiguration, // TODO: Remove ASAP. Only in here due to dashboard detail view bug
  }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [defaultKpiConfiguration, setDefaultKpiConfiguration] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
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
      if (resetKpiModel.getData("name") === true) {
        kpiConfigurationModel.setData("kpi_name", defaultKpiConfiguration?.name);
      }

      if (resetKpiModel.getData("internalProperties") === true) {
        kpiConfigurationModel.setData("kpi_category", defaultKpiConfiguration?.category);
        kpiConfigurationModel.setData("kpi_settings", defaultKpiConfiguration?.settings);
        kpiConfigurationModel.setData("filters", defaultKpiConfiguration?.supported_filters);
        kpiConfigurationModel.setData("dataPoints", defaultKpiConfiguration?.dataPoints);
      }

      const configuration = dashboardModel.getData("configuration");
      const resetKpiData = kpiConfigurationModel?.getPersistData();
      configuration[index] = resetKpiData;
      setKpiConfiguration({...resetKpiData});
      dashboardModel.setData("configuration", configuration);

      await dashboardsActions.updateDashboardKpiV2(getAccessToken, cancelTokenSource, dashboardModel?.getData("_id"), kpiConfigurationModel);
      toastContext.showResetSuccessToast("KPI Configuration");

      if (closePanel) {
        closePanel();
      }
    } catch (error) {
      if (isMounted?.current === true) {
        const parsedError = parseError(error);
        setErrorMessage(parsedError);
      }
    }
  };

  if (defaultKpiConfiguration == null || dashboardModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <ResetButton
        model={kpiConfigurationModel}
        resetFunction={resetKpiData}
        isLoading={isLoading}
        disabled={disabled || resetKpiModel?.isChanged() === false}
      />
      <InfoText errorMessage={errorMessage} />
    </div>
  );
}

ResetMetricConfigurationButton.propTypes = {
  kpiConfigurationModel: PropTypes.object,
  resetKpiModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  identifier: PropTypes.string,
  index: PropTypes.number,
  closePanel: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  setKpiConfiguration: PropTypes.func,
  handleClose: PropTypes.func,
};

export default  React.memo(ResetMetricConfigurationButton);