import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getFormattedTimestamp} from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import MultipleTaskChunksContainer from "components/common/fields/log/tasks/MultipleTaskChunksContainer";

// TODO: This needs to be tailored to Pipeline Field
function ChunkedTaskLogField(
  {
    logRecord,
    logMetaRecordId,
    taskId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [logData, setLogData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(undefined);
  const [chunkCount, setChunkCount] = useState(0);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setLogData(undefined);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (isMongoDbId(taskId)) {
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
    const response = await taskActions.getTaskActivityChunkCount(getAccessToken, cancelSource, logMetaRecordId);
    const count = response?.data?.count;

    if (typeof count === "number") {
      setChunkCount(count);
    }
  };

  return (
    <MultipleTaskChunksContainer
      isLoading={isLoading}
      logMetaRecordId={logMetaRecordId}
      chunkCount={chunkCount}
    />
  );
}

ChunkedTaskLogField.propTypes = {
  logRecord: PropTypes.object,
  logMetaRecordId: PropTypes.string,
  taskId: PropTypes.string,
};

export default ChunkedTaskLogField;