import React, {useContext} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportPipelineActivityLogDataOverlay from "components/common/modal/export_data/ExportPipelineActivityLogDataOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";

function ExportPipelineActivityLogButton(
  {
    isLoading,
    activityLogData,
    className,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportPipelineActivityLogDataOverlay
        isLoading={isLoading}
        activityLogData={activityLogData}
      />
    );
  };

  return (
    <ExportDataButtonBase
      className={className}
      isLoading={isLoading}
      disabled={!Array.isArray(activityLogData) || activityLogData.length === 0}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportPipelineActivityLogButton.propTypes = {
  activityLogData: PropTypes.array,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ExportPipelineActivityLogButton;