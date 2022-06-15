import React, {useContext} from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsBackupScheduledTaskEditorPanel from "components/settings/logs_backup/LogsBackupScheduledTaskEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import UpdateCenterPanelOverlayBase from "components/common/overlays/center/UpdateCenterPanelOverlayBase";

function UpdateLogsBackupScheduleOverlay({ loadData, isMounted, scheduledTaskModel, scheduledTasks }) {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (scheduledTaskModel == null) {
    return null;
  }

  return (
    <UpdateCenterPanelOverlayBase
      isMounted={isMounted}
      objectType={tagMetadata.type}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.STANDARD}
    >
      <LogsBackupScheduledTaskEditorPanel
        scheduledTaskData={scheduledTaskModel}
        taskList={scheduledTasks}
        handleClose={closePanel}
      />
    </UpdateCenterPanelOverlayBase>
  );
}

UpdateLogsBackupScheduleOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scheduledTaskModel: PropTypes.object,
  scheduledTasks: PropTypes.array
};

export default UpdateLogsBackupScheduleOverlay;


