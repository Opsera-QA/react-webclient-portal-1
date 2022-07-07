import React, {useContext} from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsExportScheduledTaskEditorPanel from "components/settings/logs_management/LogsExportScheduledTaskEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";
import UpdateCenterPanelOverlayBase from "components/common/overlays/center/UpdateCenterPanelOverlayBase";

function UpdateLogsExportScheduleOverlay({ loadData, isMounted, scheduledTaskModel, scheduledTasks, s3ToolId }) {
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
      <LogsExportScheduledTaskEditorPanel
        scheduledTaskData={scheduledTaskModel}
        taskList={scheduledTasks}
        handleClose={closePanel}
        s3ToolId={s3ToolId}
      />
    </UpdateCenterPanelOverlayBase>
  );
}

UpdateLogsExportScheduleOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scheduledTaskModel: PropTypes.object,
  scheduledTasks: PropTypes.array,
  s3ToolId: PropTypes.string
};

export default UpdateLogsExportScheduleOverlay;


