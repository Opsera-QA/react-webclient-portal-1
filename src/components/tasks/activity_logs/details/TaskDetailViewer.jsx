import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import TaskActivityTabPanel from "components/tasks/activity_logs/details/TaskActivityTabPanel";

function TaskDetailViewer({ taskActivityLogId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskActivityLogModel, setTaskActivityLogModel] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setTaskActivityLogModel(undefined);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(taskActivityLogId)) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskActivityLogId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getPipelineTaskData(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getPipelineTaskData = async (cancelSource = cancelTokenSource) => {
    const response = await taskActivityLogActions.getTaskActivityLogById(getAccessToken, cancelSource, taskActivityLogId);
    const taskActivityLog = response?.data?.data;

    if (isMounted?.current === true && taskActivityLog) {
      setTaskActivityLogModel(new Model(taskActivityLog, response?.data?.metadata, false));
    }
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Task Details`}
      titleIcon={faClipboardList}
      isLoading={isLoading}
    >
      <div className="m-3 shaded-panel">
        <TaskActivityTabPanel
          taskActivityLogModel={taskActivityLogModel}
        />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

TaskDetailViewer.propTypes = {
  taskActivityLogId: PropTypes.string,
};

export default TaskDetailViewer;