import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner, faPlus} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import Model from "core/data_model/model";
import dashboardMetadata from "components/insights/dashboards/dashboard-metadata";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import {DialogToastContext} from "contexts/DialogToastContext";

function AddToDashboardButton({ disable, selectedDashboardData, kpiData, closePanel, className }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const addChartToDashboard = async () => {
    try {
      setIsSaving(true);

      let newDashboard = new Model(selectedDashboardData.getData("dashboard"), dashboardMetadata, false);
      let newConfigObj = newDashboard.getData("configuration");

      const configObj = {
        kpi_identifier: kpiData.identifier,
        kpi_name: kpiData.name,
        kpi_category: kpiData.category,
        kpi_settings: kpiData.settings,
        filters: kpiData.supported_filters,
        dataPoints: kpiData.dataPoints,
        tags: [],
        active: kpiData.active,
      };

      newConfigObj.push(configObj);

      newDashboard.setData("configuration", newConfigObj);
      await dashboardsActions.updateDashboardV2(getAccessToken, cancelTokenSource, newDashboard);
      toastContext.showUpdateSuccessResultDialog("Dashboard KPI");
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
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Adding To Dashboard</span>);
    }

    return (<span><FontAwesomeIcon icon={faPlus} fixedWidth className="mr-2"/>Add To Dashboard</span>);
  };

  return (
    <div className={className}>
      <Button
        size={"sm"}
        disabled={disable || isSaving || selectedDashboardData?.getData("dashboard")?.configuration == null || selectedDashboardData?.getData("dashboard")?.configuration.length >= 10}
        onClick={() => addChartToDashboard()}>
        {getLabel()}
      </Button>
    </div>
  );
}

AddToDashboardButton.propTypes = {
  disable: PropTypes.bool,
  selectedDashboardData: PropTypes.object,
  kpiData: PropTypes.object,
  closePanel: PropTypes.func,
  className: PropTypes.string
};

export default React.memo(AddToDashboardButton);