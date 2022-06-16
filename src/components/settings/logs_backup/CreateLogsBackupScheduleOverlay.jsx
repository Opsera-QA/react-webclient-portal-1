import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsBackupScheduledTaskEditorPanel from "components/settings/logs_backup/LogsBackupScheduledTaskEditorPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import modelHelpers from "components/common/model/modelHelpers";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function CreateLogsBackupScheduleOverlay(
  {
    loadData,
    isMounted,
    scheduledTasks,
    s3ToolId,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [scheduledTaskModel, setScheduledTaskModel] = useState(undefined);

  useEffect(() => {
    setScheduledTaskModel(undefined);

    if (isMongoDbId(s3ToolId) === true) {
      const newModel = modelHelpers.parseObjectIntoModel({}, scheduledTaskMetadata);
      newModel?.setData("task.s3ToolId", s3ToolId);
      setScheduledTaskModel({...newModel});
    }
  }, [s3ToolId]);

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
  scheduledTasks: PropTypes.array,
  s3ToolId: PropTypes.string,
};

export default CreateLogsBackupScheduleOverlay;


