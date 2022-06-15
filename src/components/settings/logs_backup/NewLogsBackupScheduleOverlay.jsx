import React, {useState, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsBackupScheduledTaskEditorPanel from "components/settings/logs_backup/LogsBackupScheduledTaskEditorPanel";
import ScheduledTaskEditorPanel from "components/common/fields/scheduler/ScheduledTaskEditorPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import {CENTER_OVERLAY_SIZES} from "components/common/overlays/center/CenterOverlayContainer";

function NewLogsBackupScheduleOverlay({ loadData, isMounted, scheduledTaskModel, scheduledTasks }) {
  const toastContext = useContext(DialogToastContext);
  const [tagData, setTagData] = useState(new Model({...tagMetadata.newObjectFields}, tagMetadata, true));

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
      size={CENTER_OVERLAY_SIZES.SMALL}
    >
      <LogsBackupScheduledTaskEditorPanel
          handleClose={closePanel}
          scheduledTaskData={scheduledTaskModel}
          taskList={scheduledTasks}
        />
    </CreateCenterPanel>
  );
}
 
NewLogsBackupScheduleOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scheduledTaskModel: PropTypes.object,
  scheduledTasks: PropTypes.array
};

export default NewLogsBackupScheduleOverlay;


