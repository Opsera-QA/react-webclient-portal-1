import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {hasStringValue} from "components/common/helpers/string-helpers";

function TaskLogChunkDisplayer(
  {
    chunkNumber,
    logMetaRecordId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [logData, setLogData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setLogData(undefined);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(logMetaRecordId) && typeof chunkNumber === "number") {
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
  }, [chunkNumber]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTaskChunk(cancelSource);
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

  const getTaskChunk = async (cancelSource = cancelTokenSource) => {
    const response = await taskActions.getTaskActivityChunk(getAccessToken, cancelSource, logMetaRecordId, chunkNumber);
    const taskLogChunk = response?.data?.data?.data;

    if (taskLogChunk) {
      setLogData(taskLogChunk);
    }
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <div>Loading Log</div>
      );
    }

    if (hasStringValue(logData) !== true) {
      return (
        <div>
          There was no log data associated with this log record
        </div>
      );
    }

    return (logData);
  };

  return (
    <div className={"h-100"}>
      {getBody()}
    </div>
  );
}

TaskLogChunkDisplayer.propTypes = {
  logMetaRecordId: PropTypes.string,
  chunkNumber: PropTypes.number,
};

export default TaskLogChunkDisplayer;