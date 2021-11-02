import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";

// TODO: This needs to be tailored to Pipeline Field
function GridFsLogField({gridFsLogRecordId}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [consoleLogs, setConsoleLogs] = useState([]);
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

    if (isMongoDbId(gridFsLogRecordId)) {
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
    const response = await taskActions.getTaskActivityGridFsLogById(getAccessToken, cancelSource, gridFsLogRecordId);
    console.log("response: " + JSON.stringify(response));
    const pipelineActivityLogData = response?.data?.data;

  };

  return (
    <div>
      <div className="m-2">
        {/*<div className="float-right mr-2">*/}
        {/*  <span>{getFormattedTimestamp(dataObject?.createdAt)}</span>*/}
        {/*</div>*/}
        {/*<span><span className="text-muted ml-2">Step: </span> {dataObject?.step_name}</span>*/}
      </div>
      <div className={"my-2"}>
        {/*{getBody()}*/}
      </div>
      <div className={"my-2"}>
        {/*<StandaloneConsoleLogsDisplayer*/}
        {/*  consoleLogs={consoleLogs}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

GridFsLogField.propTypes = {
  gridFsLogRecordId: PropTypes.string,
};

export default GridFsLogField;