import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {faShieldCheck} from "@fortawesome/pro-light-svg-icons";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import TaskAuditLogsDisplayer from "components/tasks/audit/TaskAuditLogsDisplayer";
import TaskAuditLogDetailOverlay from "components/tasks/audit/details/TaskAuditLogDetailOverlay";

export default function TaskAuditLogOverlay({taskId}) {
  const [selectedAuditLogId, setSelectedAuditLogId] = useState(undefined);
  const {
    toastContext,
  } = useComponentStateReference();

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskId == null) {
    return null;
  }

  if (isMongoDbId(selectedAuditLogId) === true) {
    return (
      <TaskAuditLogDetailOverlay
        taskId={taskId}
        selectedAuditLogId={selectedAuditLogId}
        setSelectedAuditLogId={setSelectedAuditLogId}
      />
    );
  }

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Task Audit Log Viewer`}
      titleIcon={faShieldCheck}
      showToasts={true}
    >
      <div className={"p-3"}>
        <TaskAuditLogsDisplayer
          taskId={taskId}
          setSelectedAuditLogId={setSelectedAuditLogId}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

TaskAuditLogOverlay.propTypes = {
  taskId: PropTypes.string
};