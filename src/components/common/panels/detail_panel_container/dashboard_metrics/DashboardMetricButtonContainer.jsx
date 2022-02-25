import React, {useState} from "react";
import PropTypes from "prop-types";
import CloseButton from "components/common/buttons/CloseButton";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import StrictSaveButton from "components/common/buttons/saving/StrictSaveButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import ResetButton from "components/common/buttons/reset/ResetButton";
import DeleteDashboardMetricButton from "components/common/buttons/dashboards/metric/DeleteDashboardMetricButton";
import ResetDashboardMetricButton from "components/common/buttons/dashboards/metric/ResetDashboardMetricButton";

function DashboardMetricButtonContainer(
  {
    metricModel,
    saveDataFunction,
    closePanelFunction,
    isStrict,
    disableSaveButton,
    showIncompleteDataMessage,
    setKpis,
    metricIndex,
    dashboardModel,
  }) {
  const getExtraButtons = () => {
    return (
      <div className={"d-flex"}>
        <DeleteDashboardMetricButton
          metricModel={metricModel}
          closePanelFunction={closePanelFunction}
          setKpis={setKpis}
          index={metricIndex}
          dashboardModel={dashboardModel}
        />
        <ResetDashboardMetricButton
          className={"ml-2"}
          metricModel={metricModel}
          closePanelFunction={closePanelFunction}
          setKpis={setKpis}
          index={metricIndex}
          dashboardModel={dashboardModel}
        />
      </div>
    );
  };

  const getSaveButton = () => {
    if (isStrict === true) {
      return (
        <StrictSaveButton
          disable={disableSaveButton}
          recordDto={metricModel}
          updateRecord={saveDataFunction}
        />
      );
    }

    return (
      <LenientSaveButton
        disable={disableSaveButton}
        recordDto={metricModel}
        updateRecord={saveDataFunction}
        showIncompleteDataMessage={showIncompleteDataMessage}
      />
    );
  };

  return (
    <SaveButtonContainer extraButtons={getExtraButtons()}>
      {getSaveButton()}
      <CloseButton
        className={"mx-1"}
        recordDto={metricModel}
        closeEditorCallback={closePanelFunction}
      />
    </SaveButtonContainer>
  );
}

DashboardMetricButtonContainer.propTypes = {
  metricModel: PropTypes.object,
  saveDataFunction: PropTypes.func,
  closePanelFunction: PropTypes.func,
  isStrict: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
  showIncompleteDataMessage: PropTypes.bool,
  setKpis: PropTypes.func,
  metricIndex: PropTypes.number,
  dashboardModel: PropTypes.func,
};

export default DashboardMetricButtonContainer;