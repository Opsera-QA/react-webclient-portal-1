import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {taskAuditLogActions} from "hooks/audit_logs/tasks/taskAuditLog.actions";

export default function useGetTaskAuditLogById(
  taskId,
  auditLogId,
  handleErrorFunction,
) {
  const [auditLog, setAuditLog] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
  } = useComponentStateReference();
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAuditLog(undefined);

    if (isMongoDbId(taskId) === true && isMongoDbId(auditLogId) === true && loadData) {
      loadData(getAuditLogsForTask, handleErrorFunction).catch(() => {});
    }
  }, [taskId, auditLogId]);

  const getAuditLogsForTask = async () => {
    if (isMongoDbId(taskId) !== true || isMongoDbId(auditLogId) !== true) {
      return;
    }

    const response = await taskAuditLogActions.getTaskAuditLogById(
      getAccessToken,
      cancelTokenSource,
      taskId,
      auditLogId,
    );
    setAuditLog(DataParsingHelper.parseNestedObject(response, "data.data", undefined));
  };

  return ({
    auditLog: auditLog,
    setAuditLog: setAuditLog,
    loadData: () => loadData(getAuditLogsForTask, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
