import { useEffect, useState } from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import {taskAuditLogActions} from "hooks/audit_logs/tasks/taskAuditLog.actions";
import {UserActivityAuditLogFilterModel} from "hooks/audit_logs/userActivityAuditLogFilter.model";

export default function useGetAuditLogsForTask(
  taskId,
  handleErrorFunction,
) {
  const [auditLogs, setAuditLogs] = useState([]);
  const [taskAuditLogFilterModel, setTaskAuditLogFilterModel] = useState(new UserActivityAuditLogFilterModel());
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
    setAuditLogs([]);

    if (isMongoDbId(taskId) === true && loadData) {
      loadData(getAuditLogsForTask, handleErrorFunction).catch(() => {});
    }
  }, [taskId]);

  const getAuditLogsForTask = async (newFilterModel = taskAuditLogFilterModel) => {
    if (isMongoDbId(taskId) !== true) {
      return;
    }

    const response = await taskAuditLogActions.getAuditLogsForTask(
      getAccessToken,
      cancelTokenSource,
      taskId,
      taskAuditLogFilterModel?.getData("user"),
      taskAuditLogFilterModel?.getData("action"),
    );
    setAuditLogs(DataParsingHelper.parseArray(response?.data?.data, []));
    newFilterModel.setData("totalCount", response?.data?.count);
    newFilterModel.updateActiveFilters();
    setTaskAuditLogFilterModel({...newFilterModel});
  };

  return ({
    auditLogs: auditLogs,
    setAuditLogs: setAuditLogs,
    taskAuditLogFilterModel: taskAuditLogFilterModel,
    setTaskAuditLogFilterModel: setTaskAuditLogFilterModel,
    loadData: () => loadData(getAuditLogsForTask, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
