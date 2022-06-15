import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsBackupScheduledTaskEditorPanel from "components/settings/logs_backup/LogsBackupScheduledTaskEditorPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import modelHelpers from "components/common/model/modelHelpers";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";

function CreateLogsBackupScheduleOverlay(
  {
    loadData,
    isMounted,
    scheduledTasks,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [scheduledTaskModel] = useState(modelHelpers.parseObjectIntoModel({}, scheduledTaskMetadata));

  const closePanel = () => {
    if (isMounted?.current === true) {
      loadData();
    }

    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <CreateCenterPanel
      closePanel={closePanel}
      objectType={tagMetadata.type}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.STANDARD}
    >
      <LogsBackupScheduledTaskEditorPanel
        handleClose={closePanel}
        scheduledTaskData={scheduledTaskModel}
        taskList={scheduledTasks}
      />
    </CreateCenterPanel>
  );
}

CreateLogsBackupScheduleOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scheduledTaskModel: PropTypes.object,
  scheduledTasks: PropTypes.array,
};

export default CreateLogsBackupScheduleOverlay;


