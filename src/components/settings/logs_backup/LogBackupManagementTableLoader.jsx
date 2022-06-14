import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import { scheduledTaskActions } from "components/common/fields/scheduler/scheduledTask.actions";
import Model from "core/data_model/model";
import { scheduledTaskMetadata } from "components/common/fields/scheduler/scheduledTask.metadata";
import ScheduledTasksTable from "components/common/fields/scheduler/ScheduledTasksTable";

function LogsBackupManagementTableLoader(s3ToolId, setScheduledTaskModel) {
  const {getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledTasks, setScheduledTasks] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);


  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
  
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
  
    loadData(cancelTokenSource).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [s3ToolId]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      
      await loadScheduledTasks(cancelSource, getAccessToken, s3ToolId);

   
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };


  const loadScheduledTasks = async (cancelSource = cancelTokenSource, getAccessToken, s3ToolId) => {
    if(s3ToolId){
      console.log(s3ToolId);
      const response = await scheduledTaskActions.getScheduledLogPush(getAccessToken, cancelSource, s3ToolId);
      const newScheduledTasksList = response?.data?.data;
      if (isMounted?.current === true && Array.isArray(newScheduledTasksList)) {
        setScheduledTasks([...newScheduledTasksList]);
      }
    }
  };

  const createScheduledTaskFunction = () => {
    const newModel = new Model({ ...scheduledTaskMetadata.newObjectFields }, scheduledTaskMetadata, true);
    newModel.setData("task", { taskType: "pipeline-log-s3-push", s3ToolId: s3ToolId });
    setScheduledTaskModel({ ...newModel });
  };

  return (
    <ScheduledTasksTable
      isLoading={isLoading}
      scheduledTasks={scheduledTasks}
      loadDataFunction={loadData}
      setScheduledTaskModel={setScheduledTaskModel}
      isMounted={isMounted}
      createScheduledTaskFunction={createScheduledTaskFunction}
    />
  );
}


export default LogsBackupManagementTableLoader;