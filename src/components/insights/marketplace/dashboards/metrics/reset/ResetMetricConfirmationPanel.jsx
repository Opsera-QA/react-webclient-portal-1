import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ResetConfirmationPanel from "components/common/panels/general/reset/ResetConfirmationPanel";
import ResetMetricConfigurationButton from "components/common/buttons/dashboards/ResetMetricConfigurationButton";
import ResetMetricOptionsEditorPanel
  from "components/insights/marketplace/dashboards/metrics/reset/ResetMetricOptionsEditorPanel";
import Model from "core/data_model/model";
import {resetMetricMetadata} from "components/insights/marketplace/dashboards/metrics/reset/resetMetric.metadata"; // TODO: Make specialized Model when Dashboard refresh issue is fixed.

function ResetMetricConfirmationPanel(
  {
    closePanelFunction,
    kpiConfigurationModel,
    dashboardModel,
    identifier,
    index,
    setKpiConfiguration, // TODO: This is a workaround for the Dashboard refresh issue. Remove ASAP.
  }) {
  const [resetKpiModel, setResetKpiModel] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setResetKpiModel(new Model({...resetMetricMetadata.newObjectFields}, resetMetricMetadata, false));

    return () => {
      isMounted.current = false;
    };
  }, []);

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
          resetKpiModel={resetKpiModel}
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


