import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import TaskActivityTabPanel from "components/tasks/activity_logs/details/TaskActivityTabPanel";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faClipboardList} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import taskActions from "components/tasks/task.actions";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";

function TaskDetailViewer({ taskActivityLogId }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskData, setTaskData] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setTaskData(undefined);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

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
    const pipelineActivityLogData = response?.data?.data;

    if (isMounted?.current === true && pipelineActivityLogData) {
      setTaskData(new Model(pipelineActivityLogData, response?.data?.metadata, false));
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
        <TaskActivityTabPanel gitTaskActivityData={taskData?.data} />
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

TaskDetailViewer.propTypes = {
  taskActivityLogId: PropTypes.string,
};

export default TaskDetailViewer;