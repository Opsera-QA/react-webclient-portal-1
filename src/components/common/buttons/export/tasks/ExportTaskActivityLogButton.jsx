import React, { useContext } from "react";
import PropTypes from "prop-types";
import ExportTaskActivityLogDataOverlay from "components/tasks/activity_logs/ExportTaskActivityLogDataOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";

function ExportTaskActivityLogButton({isLoading, activityLogData, className}) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportTaskActivityLogDataOverlay
        isLoading={isLoading}
        activityLogData={activityLogData}
      />
    );
  };

  return (
    <ExportDataButtonBase
      launchOverlayFunction={launchOverlayFunction}
      isLoading={isLoading}
      className={className}
      disabled={!Array.isArray(activityLogData) || activityLogData.length === 0}
    />
  );
}

ExportTaskActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportTaskActivityLogButton;