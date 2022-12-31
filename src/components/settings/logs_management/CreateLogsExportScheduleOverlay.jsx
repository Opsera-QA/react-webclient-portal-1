import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import tagMetadata from "components/settings/tags/tag.metadata";
import LogsExportScheduledTaskEditorPanel from "components/settings/logs_management/LogsExportScheduledTaskEditorPanel";
import { DialogToastContext } from "contexts/DialogToastContext";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import { CENTER_OVERLAY_SIZES } from "components/common/overlays/center/CenterOverlayContainer";
import modelHelpers from "components/common/model/modelHelpers";
import { logsExportScheduledTaskMetadata } from "components/settings/logs_management/LogsExportScheduledTask.metadata";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";

function CreateLogsExportScheduleOverlay({
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
      const newModel = modelHelpers.parseObjectIntoModel(
        {},
        logsExportScheduledTaskMetadata,
      );
      newModel?.setData("task.s3ToolId", s3ToolId);
      setScheduledTaskModel({ ...newModel });
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
      objectType={logsExportScheduledTaskMetadata.type}
      loadData={loadData}
      size={CENTER_OVERLAY_SIZES.STANDARD}
    >
      <LogsExportScheduledTaskEditorPanel
        handleClose={closePanel}
        scheduledTaskData={scheduledTaskModel}
        taskList={scheduledTasks}
        s3ToolId={s3ToolId}
      />
    </CreateCenterPanel>
  );
}

CreateLogsExportScheduleOverlay.propTypes = {
  isMounted: PropTypes.object,
  loadData: PropTypes.func,
  scheduledTasks: PropTypes.array,
  s3ToolId: PropTypes.string,
};

export default CreateLogsExportScheduleOverlay;
