import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {dashboardMetricActions} from "components/insights/dashboards/metrics/dashboardMetric.actions";
import DeleteButton from "components/common/buttons/delete/DeleteButton";

function DeleteDashboardMetricButton(
  {
    kpiConfigurationModel,
    dashboardModel,
    index,
    setKpis,
    disabled,
    closePanelFunction,
    className,
  }) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

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

  const deleteKpi = async () => {
    await dashboardMetricActions.deleteDashboardKpiV2(getAccessToken, cancelTokenSource, dashboardModel?.getData("_id"), kpiConfigurationModel?.getData("_id"));

    // This is a workaround necessary for hiding the KPI after it's deleted.
    dashboardModel?.getData("configuration").splice(index, 1);
    setKpis(dashboardModel?.getData("configuration"));

    if (closePanelFunction) {
      closePanelFunction();
    }
  };

  if (kpiConfigurationModel == null || dashboardModel == null) {
    return null;
  }

  return (
    <DeleteButton
      size={"md"}
      className={className}
      dataObject={kpiConfigurationModel}
      deleteRecord={deleteKpi}
      disabled={disabled}
    />
  );
}

DeleteDashboardMetricButton.propTypes = {
  kpiConfigurationModel: PropTypes.object,
  dashboardModel: PropTypes.object,
  setKpis: PropTypes.func,
  index: PropTypes.number,
  closePanelFunction: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default  React.memo(DeleteDashboardMetricButton);