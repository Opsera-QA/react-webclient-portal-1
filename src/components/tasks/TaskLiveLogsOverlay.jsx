import React, {useState, useEffect, useContext, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { faTimes, faSync } from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {getFormattedTimestamp} from "components/common/fields/date/DateFieldBase";
import axios from "axios";
import {taskActivityLogActions} from "components/tasks/activity_logs/taskActivityLog.actions";

function TaskLiveLogsOverlay({ runCount, taskId }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [lastCheckTimestamp, setLastCheckTimestamp] = useState(undefined);
  const [data, setData] = useState("");
  const [timer, setTimer] = useState();
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [taskState, setTaskState] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (taskId == null || runCount == null) {
      setData("Error: Unable to load Task Activity due to missing attributes.");
      setData("");
      clearInterval(timer);
      return;
    }

    //first do a delayed call to get initial data (rather than waiting 30 seconds)
    setTimeout(async function() {
      await pullLogs();
    }, 5000);

    const timerInterval = startTimer();
    setTimer(timerInterval);

    return () => {
      source.cancel();
      isMounted.current = false;

      if (timerInterval) {
        clearInterval(timer);
      }
    };
  }, [taskId, runCount]);

  const startTimer = () => {
    const timerInterval = setInterval(async function () {
      await pullLogs();
      clearInterval(timerInterval);
      setLoading(false);
    }, 30 * 1000); // 30 seconds
    return timerInterval;
  };

  const pullLogs = async () => {
    try {
      setLoading(true);
      const response = await taskActivityLogActions.pullLiveLogV2(getAccessToken, cancelTokenSource, taskId, runCount);
      const log = response?.data?.log;
      const taskState = response?.data?.state;

      if (taskState != null) {
        setTaskState(taskState);

        if (taskState !== "running" && timer != null) {
          clearInterval(timer);
        }
      }

      if (typeof log === "string" && log.length > 0) {
        setData(log);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.log(error?.message);
        setErrors(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setLastCheckTimestamp(new Date());
        setLoading(false);
      }
    }
  };

  const handleCloseWindow = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();

    if (timer) {
      clearInterval(timer);
    }
    setLoading(false);
  };

  const getBody = () => {
    const newLog = typeof data !== "string" || data?.length === 0 ? `Loading Task Activity, Please stand by...` : data;

    return (newLog);
  };

  const getLastTimestamp = () => {
    if (lastCheckTimestamp != null) {
      return (`\n\nLast log pull on ${getFormattedTimestamp(lastCheckTimestamp)}`);
    }
  };

  const getTaskStateMessage = () => {
    if (taskState != null && taskState !== "running") {
      return (`\n\nThe Task is not currently running, so no new logs will be shown.`);
    }
  };

  return (
    <div className="console-text workflow-tool-activity-container">
      <div style={{minHeight: "15px"}}>
        <IconBase
          icon={faSync}
          isLoading={isLoading}
          fixedWidth
          onClickFunction={pullLogs}
        />
        <div className="text-right float-right">
          <IconBase
            icon={faTimes}
            fixedWidth
            onClickFunction={() => {
              handleCloseWindow();
            }}
          />
        </div>
      </div>
      <div className="workflow-tool-activity-window">
        {getBody()}
        {getLastTimestamp()}
        {getTaskStateMessage()}
      </div>
    </div>
  );
}


TaskLiveLogsOverlay.propTypes = {
  //TODO: Not sure if it's returned as string or number. Clear this up once done.
  runCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  taskId: PropTypes.string,
};

export default TaskLiveLogsOverlay;